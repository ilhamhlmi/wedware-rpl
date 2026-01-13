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
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

// POST -> tambah produk baru + upload gambar
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const size = formData.get("size")?.toString().trim() || null;
    const stock = Number(formData.get("stock"));
    const price = Number(formData.get("price"));
    const file = formData.get("image");

    const uploadedFile = file instanceof File ? file : null;

    if (!name || !category || stock <= 0 || price <= 0) {
      return NextResponse.json(
        { message: "Data tidak lengkap atau tidak valid" },
        { status: 400 }
      );
    }

    let imageUrl = "https://via.placeholder.com/400x400?text=No+Image";

    // 🔥 UPLOAD KE SUPABASE (PAKAI BUFFER)
    if (
      uploadedFile &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      try {
        const ext = uploadedFile.name.split(".").pop();
        const filePath = `products/${Date.now()}.${ext}`;
        const buffer = Buffer.from(await uploadedFile.arrayBuffer());

        const { error } = await supabase.storage
          .from("products")
          .upload(filePath, buffer, {
            contentType: uploadedFile.type,
            upsert: false
          });

        if (error) throw error;

        const { data } = supabase
          .storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      } catch (err) {
        console.error("Supabase upload error:", err);
      }
    }

    const [result]: any = await db.execute(
      `INSERT INTO products (name, category, size, stock, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, category, size, stock, price, imageUrl]
    );

    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
      productId: result.insertId,
      imageUrl
    });
  } catch (error) {
    console.error("PRODUCT ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// DELETE -> hapus produk
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ada" },
        { status: 400 }
      );
    }

    await db.execute("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    console.error("Error DELETE product:", err);
    return NextResponse.json(
      { message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}

// PATCH -> update produk
export async function PATCH(req: Request) {
  try {
    const { id, name, category, size, stock, price } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ada" },
        { status: 400 }
      );
    }

    await db.execute(
      `UPDATE products
       SET name = ?, category = ?, size = ?, stock = ?, price = ?
       WHERE id = ?`,
      [name, category, size, stock, price, id]
    );

    return NextResponse.json({ message: "Produk berhasil diupdate" });
  } catch (err) {
    console.error("Error PATCH product:", err);
    return NextResponse.json(
      { message: "Gagal update produk" },
      { status: 500 }
    );
  }
}
