import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/**
 * SUPABASE SERVER CLIENT
 * WAJIB selalu dibuat (tidak pakai conditional NODE_ENV)
 */
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/* GET -> ambil semua produk */
export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT id, name, category, size, stock, price, image_url FROM products"
    );

    return NextResponse.json({ products: rows });
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mengambil produk" },
      { status: 500 }
    );
  }
}

/*  POST -> tambah produk */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString().trim();
    const category = formData.get("category")?.toString().trim();
    const size = formData.get("size")?.toString().trim() || null;
    const stock = Number(formData.get("stock"));
    const price = Number(formData.get("price"));
    const file = formData.get("image") as File | null;

    if (!name || !category || stock <= 0 || price <= 0 || !file) {
      return NextResponse.json(
        { message: "Data tidak valid" },
        { status: 400 }
      );
    }

    /* ===== UPLOAD KE SUPABASE ===== */
    const ext = file.name.split(".").pop();
    const filePath = `products/${Date.now()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
      .from("products")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    /* ===== SIMPAN KE DATABASE ===== */
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
  } catch (err) {
    console.error("POST PRODUCT ERROR:", err);
    return NextResponse.json(
      { message: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}