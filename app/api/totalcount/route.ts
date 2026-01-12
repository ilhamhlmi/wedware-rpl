import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // TOTAL USER (role = user)
    const [userResult] = await db.query<any[]>(`
      SELECT COUNT(*) AS total FROM users WHERE role = 'user'
    `);

    // STATUS ORDERS
    const [orderStatus] = await db.query<any[]>(`
      SELECT
        COALESCE(SUM(status = 'pending'), 0) AS pending,
        COALESCE(SUM(status = 'progress'), 0) AS progress,
        COALESCE(SUM(status = 'done'), 0) AS done
      FROM orders
    `);

    return NextResponse.json({
      users: {
        total: Number(userResult[0].total),
      },
      orders: {
        pending: Number(orderStatus[0].pending),
        progress: Number(orderStatus[0].progress),
        done: Number(orderStatus[0].done),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error dashboard" },
      { status: 500 }
    );
  }
}