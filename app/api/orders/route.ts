export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { supabase } from "@/lib/supabase";

/* GET ADMIN DASHBOARD Menampilkan order status: pending & progress */
export async function GET() {
  try {
    const [rows]: any = await db.query(`
      SELECT 
        o.id,
        o.user_id,
        u.username AS nama,
        o.address,
        o.fitting_date,
        o.fitting_time,
        o.wedding_date,
        o.wedding_time,
        o.return_date,
        o.status,
        o.created_at
      FROM orders o
      JOIN users u ON u.id = o.user_id
      WHERE o.status IN ('pending', 'progress')
      ORDER BY o.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data order" },
      { status: 500 }
    );
  }
}

/* POST CUSTOMER ORDER Status default: pending */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // AUTH (CUSTOMER)
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // DATA ORDER
    const address = formData.get("address") as string;
    const fittingDate = formData.get("fittingDate") as string;
    const fittingTime = formData.get("fittingTime") as string;
    const weddingDate = formData.get("weddingDate") as string;
    const weddingTime = formData.get("weddingTime") as string;
    const returnDate = formData.get("returnDate") as string;

    const itemsRaw = formData.get("items");
    const items = itemsRaw ? JSON.parse(itemsRaw as string) : [];

    const file = formData.get("file");
    const uploadedFile = file instanceof File ? file : null;

    if (
      !address ||
      !fittingDate ||
      !fittingTime ||
      !weddingDate ||
      !weddingTime ||
      !returnDate ||
      !items.length
    ) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // AUTO ASSIGN WORKER (beban paling sedikit)
    const [workers]: any = await db.query(`
      SELECT u.id
      FROM users u
      LEFT JOIN orders o ON u.id = o.worker_id
      WHERE u.role = 'worker'
      GROUP BY u.id
      ORDER BY COUNT(o.id) ASC
      LIMIT 1
    `);

    if (!workers.length) {
      return NextResponse.json(
        { message: "Tidak ada worker tersedia" },
        { status: 400 }
      );
    }

    const workerId = workers[0].id;

    // UPLOAD FILE (OPTIONAL)
    let attachmentUrl: string | null = null;

    if (uploadedFile) {
      const filePath = `orders/${Date.now()}_${uploadedFile.name}`;

      const { error } = await supabase.storage
        .from("orders")
        .upload(filePath, uploadedFile, {
          contentType: uploadedFile.type,
        });

      if (error) throw error;

      attachmentUrl = supabase.storage
        .from("orders")
        .getPublicUrl(filePath).data.publicUrl;
    }

    // INSERT ORDER (STATUS DEFAULT: PENDING)
    const [result]: any = await db.execute(
      `
      INSERT INTO orders
      (
        user_id,
        worker_id,
        address,
        fitting_date,
        fitting_time,
        wedding_date,
        wedding_time,
        return_date,
        attachment_url,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        workerId,
        address,
        fittingDate,
        fittingTime,
        weddingDate,
        weddingTime,
        returnDate,
        attachmentUrl,
        "pending"
      ]
    );

    const orderId = result.insertId;

    // INSERT ORDER ITEMS
    for (const item of items) {
      await db.execute(
        `
        INSERT INTO order_items
        (order_id, product_name, qty)
        VALUES (?, ?, ?)
        `,
        [orderId, item.name, item.qty]
      );
    }

    return NextResponse.json({
      message: "Order berhasil dikirim",
      orderId,
    });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
