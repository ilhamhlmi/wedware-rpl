import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const workerId = cookieStore.get("worker_id")?.value;
    const role = cookieStore.get("worker_role")?.value;

    if (!workerId || role !== "worker") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [workerRows] = await db.query(
      "SELECT id, username FROM users WHERE id = ? AND role = 'worker'",
      [workerId]
    );
    const worker = (workerRows as any[])[0];

    if (!worker) {
      return NextResponse.json(
        { message: "Worker tidak ditemukan" },
        { status: 404 }
      );
    }

    const [orders] = await db.query(
      `
      SELECT
        o.id AS order_id,
        u.username AS nama_customer,
        o.address,
        o.fitting_date,
        o.fitting_time,
        o.wedding_date,
        o.wedding_time,
        o.return_date,
        GROUP_CONCAT(
          CONCAT(oi.product_name, ' (', oi.qty, ')')
          SEPARATOR ', '
        ) AS products
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN laporan_worker l ON o.id = l.order_id
      WHERE o.worker_id = ?
        AND l.id IS NULL
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [workerId]
    );

    return NextResponse.json(
      {
        worker: {
          id: worker.id,
          username: worker.username,
        },
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
