import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user_id")?.value;

    // Jika belum login → return array kosong
    if (!userId) {
      return NextResponse.json([], { status: 401 });
    }

    const [rows] = await db.execute(
      `
  SELECT
    o.created_at AS tanggal,
    o.id AS order_id,
    o.status
  FROM orders o
  WHERE o.user_id = ?
  ORDER BY o.created_at DESC
  `,
      [userId]
    );


    return NextResponse.json(rows);
  } catch (error) {
    console.error("RIWAYAT ORDER ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}
