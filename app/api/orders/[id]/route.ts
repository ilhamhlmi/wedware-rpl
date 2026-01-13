export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const orderId = context.params.id;
    const { status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    if (!["pending", "progress", "done"].includes(status)) {
      return NextResponse.json(
        { message: "Status tidak valid" },
        { status: 400 }
      );
    }

    await db.execute(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, orderId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH ORDER ERROR:", error);
    return NextResponse.json(
      { message: "Gagal update status order" },
      { status: 500 }
    );
  }
}

