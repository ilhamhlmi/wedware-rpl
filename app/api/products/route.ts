import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

// GET -> fetch semua produk
export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT id, name, category, size, stock, price, image_url FROM products"
    );
    return NextResponse.json({ products: rows });
  } catch (err) {
    console.error("Error GET products:", err);
    return NextResponse.json(
      { message: "Gagal mengambil produk", error: String(err) },
      { status: 500 }
    );
  }
}

// POST -> tambah produk baru
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const size = formData.get("size")?.toString().trim() || null;
    const stock = parseInt(formData.get("stock")?.toString() || "0");
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const file = formData.get("image");
    const uploadedFile = file instanceof File ? file : null;

    if (!name || !category || stock <= 0 || price <= 0) {
      return NextResponse.json(
        { message: "Data tidak lengkap atau tidak valid" },
        { status: 400 }
      );
    }

    let imageUrl = "https://via.placeholder.com/400x400?text=Tanpa+Gambar";

    if (uploadedFile) {
      // 1. Sanitasi nama file (hapus karakter spesial & spasi)
      const fileExt = uploadedFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName; // Langsung simpan di root atau folder 'products/'

      // 2. Gunakan ArrayBuffer (lebih aman di Vercel/Node.js)
      const arrayBuffer = await uploadedFile.arrayBuffer();

      // 3. Upload ke Supabase
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, arrayBuffer, {
          contentType: uploadedFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase Upload Error Details:", uploadError);
        // Jika upload gagal, kita lempar error agar tidak lanjut ke DB
        throw new Error(`Upload storage gagal: ${uploadError.message}`);
      }

      // 4. Ambil Public URL
      const { data } = supabase.storage.from("products").getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    // 5. Simpan ke Database
    const [result]: any = await db.execute(
      `INSERT INTO products (name, category, size, stock, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, category, size, stock, price, imageUrl]
    );

    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
      productId: result.insertId,
      imageUrl,
    });
  } catch (error: any) {
    console.error("PRODUCT POST ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server", error: error.message || String(error) },
      { status: 500 }
    );
  }
}

// DELETE -> hapus produk berdasarkan id
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID produk tidak ada" }, { status: 400 });
    }

    await db.execute("DELETE FROM products WHERE id = ?", [id]);
    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("Error DELETE product:", err);
    return NextResponse.json(
      { message: "Gagal menghapus produk", error: String(err) },
      { status: 500 }
    );
  }
}

// PATCH -> update produk
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, category, size, stock, price } = body;

    if (!id) return NextResponse.json({ message: "ID produk tidak ada" }, { status: 400 });

    await db.execute(
      `UPDATE products SET name = ?, category = ?, size = ?, stock = ?, price = ? WHERE id = ?`,
      [name, category, size, stock, price, id]
    );

    return NextResponse.json({ message: "Produk berhasil diupdate" });
  } catch (err) {
    console.error("Error PATCH product:", err);
    return NextResponse.json(
      { message: "Gagal update produk", error: String(err) },
      { status: 500 }
    );
  }
}