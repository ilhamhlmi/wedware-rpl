import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

/**
 *  SERVER SUPABASE CLIENT
 * WAJIB pakai SERVICE ROLE
 */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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

    if (!name || !category || stock < 0 || price <= 0 || !file) {
      return NextResponse.json(
        { message: "Data tidak valid" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop();
    const filePath = `products/${Date.now()}.${ext}`; // ✅ FIX
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError);
      return NextResponse.json({ uploadError }, { status: 500 });
    }

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    const imageUrl = data.publicUrl;

    await db.execute(
      `INSERT INTO products (name, category, size, stock, price, image_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, category, size, stock, price, imageUrl]
    );

    return NextResponse.json({
      message: "Produk berhasil ditambahkan",
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