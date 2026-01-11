export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // AUTH
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // DATA
    const address = formData.get("address") as string;
    const fittingDate = formData.get("fittingDate") as string;
    const fittingTime = formData.get("fittingTime") as string;
    const weddingDate = formData.get("weddingDate") as string;
    const weddingTime = formData.get("weddingTime") as string;
    const returnDate = formData.get("returnDate") as string;

    const itemsRaw = formData.get("items");
    const items = itemsRaw ? JSON.parse(itemsRaw as string) : [];

    // 🔹 file sekarang OPTIONAL
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

    // INSERT ORDER
    const [result]: any = await db.execute(
      `INSERT INTO orders
      (user_id, address, fitting_date, fitting_time,
       wedding_date, wedding_time, return_date, attachment_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        address,
        fittingDate,
        fittingTime,
        weddingDate,
        weddingTime,
        returnDate,
        attachmentUrl,
      ]
    );

    const orderId = result.insertId;

    // INSERT ITEMS
    for (const item of items) {
      await db.execute(
        `INSERT INTO order_items
        (order_id, product_name, qty)
        VALUES (?, ?, ?)`,
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
