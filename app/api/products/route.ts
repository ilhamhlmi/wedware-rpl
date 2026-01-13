import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// SERVER SUPABASE CLIENT (SERVICE ROLE)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* GET -> ambil semua produk */
export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT * FROM products ORDER BY created_at DESC`
    );
    return NextResponse.json({ products: rows });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

/* POST -> tambah produk */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const size = formData.get("size")?.toString().trim() || null;
    const stock = Number(formData.get("stock"));
    const price = Number(formData.get("price"));
    const file = formData.get("image") as File | null;

    console.log("📦 Data yang diterima:", { name, category, size, stock, price });
    console.log("📷 File yang diterima:", file ? {
      name: file.name,
      size: file.size,
      type: file.type
    } : "Tidak ada file");

    // VALIDASI DATA
    if (!name || !category || isNaN(stock) || stock < 0 || isNaN(price) || price <= 0) {
      return NextResponse.json(
        { message: "Data tidak valid. Pastikan semua field terisi dengan benar." },
        { status: 400 }
      );
    }

    // VALIDASI FILE
    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "File gambar wajib diupload!" },
        { status: 400 }
      );
    }

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "Format file tidak didukung. Gunakan JPG, PNG, atau WebP." },
        { status: 400 }
      );
    }

    // Validasi ukuran file (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Ukuran file terlalu besar. Maksimal 2MB." },
        { status: 400 }
      );
    }

    console.log("✅ Validasi berhasil, mulai upload ke Supabase...");

    // UPLOAD KE SUPABASE STORAGE
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("❌ SUPABASE UPLOAD ERROR:", uploadError);
      return NextResponse.json(
        { message: `Gagal upload gambar: ${uploadError.message}` },
        { status: 500 }
      );
    }

    console.log("✅ Upload berhasil:", uploadData);

    // GET PUBLIC URL
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    const imageUrl = urlData.publicUrl;
    console.log("🔗 URL Gambar:", imageUrl);

    // SIMPAN KE DATABASE
    const [result] = await db.execute(
      `INSERT INTO products (name, category, size, stock, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, category, size, stock, price, imageUrl]
    );

    console.log("✅ Data berhasil disimpan ke database");

    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
      imageUrl,
      productId: (result as any).insertId
    });
  } catch (err) {
    console.error("❌ POST PRODUCT ERROR:", err);
    return NextResponse.json(
      { message: `Gagal menambahkan produk: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID produk tidak ditemukan" },
        { status: 400 }
      );
    }

    // Ambil dulu data produk (kalau mau sekalian hapus gambarnya di Supabase)
    const [rows]: any = await db.execute(
      `SELECT image_url FROM products WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const imageUrl = rows[0].image_url;

    // Hapus data dari database
    await db.execute(`DELETE FROM products WHERE id = ?`, [id]);

    // (Opsional tapi bagus) hapus file dari Supabase Storage
    if (imageUrl) {
      const fileName = imageUrl.split("/").pop(); // ambil nama file
      await supabase.storage.from("products").remove([fileName!]);
    }

    return NextResponse.json({
      message: "Produk berhasil dihapus",
    });
  } catch (err) {
    console.error("❌ DELETE PRODUCT ERROR:", err);
    return NextResponse.json(
      { message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const size = formData.get("size")?.toString().trim() || null;
    const stock = Number(formData.get("stock"));
    const price = Number(formData.get("price"));
    const file = formData.get("image") as File | null;

    if (!id) {
      return NextResponse.json(
        { message: "ID produk wajib ada" },
        { status: 400 }
      );
    }

    if (!name || !category || isNaN(stock) || stock < 0 || isNaN(price) || price <= 0) {
      return NextResponse.json(
        { message: "Data tidak valid" },
        { status: 400 }
      );
    }

    // Ambil data lama
    const [rows]: any = await db.execute(
      `SELECT image_url FROM products WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageUrl = rows[0].image_url;

    // Kalau ada gambar baru → upload & ganti
    if (file && file.size > 0) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { message: "Format file tidak didukung" },
          { status: 400 }
        );
      }

      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { message: "Ukuran file maksimal 2MB" },
          { status: 400 }
        );
      }

      // Upload baru
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          { message: `Gagal upload gambar: ${uploadError.message}` },
          { status: 500 }
        );
      }

      // Ambil URL baru
      const { data: urlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      const newImageUrl = urlData.publicUrl;

      // Hapus gambar lama
      if (imageUrl) {
        const oldFileName = imageUrl.split("/").pop();
        await supabase.storage.from("products").remove([oldFileName!]);
      }

      imageUrl = newImageUrl;
    }

    // Update database
    await db.execute(
      `UPDATE products 
       SET name = ?, category = ?, size = ?, stock = ?, price = ?, image_url = ?
       WHERE id = ?`,
      [name, category, size, stock, price, imageUrl, id]
    );

    return NextResponse.json({
      message: "Produk berhasil diupdate",
      imageUrl,
    });
  } catch (err) {
    console.error("❌ UPDATE PRODUCT ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mengupdate produk" },
      { status: 500 }
    );
  }
}
