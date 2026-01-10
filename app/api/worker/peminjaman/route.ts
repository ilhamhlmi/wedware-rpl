import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const workerId = cookieStore.get("user_id_worker")?.value;
    const role = cookieStore.get("user_role_worker")?.value;

    if (!workerId || role !== "worker") {
      return NextResponse.json(
        { message: "Akses tidak valid" },
        { status: 401 }
      );
    }

    // Ambil data worker
    const [workerRows]: any = await pool.query(
      "SELECT id, username FROM users WHERE id = ? AND role = 'worker'",
      [workerId]
    );

    if (!workerRows.length) {
      return NextResponse.json(
        { message: "Worker tidak ditemukan" },
        { status: 404 }
      );
    }

    const worker = workerRows[0];

    // Ambil peminjaman
    const [rows] = await pool.query(
      `
      SELECT 
        p.id AS peminjaman_id,
        u.username AS nama_customer,
        p.detail_peminjaman,
        p.ongkos_pp,
        p.biaya_peminjaman
      FROM peminjaman p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN laporan_worker l ON p.id = l.peminjaman_id
      WHERE p.worker_id = ?
        AND l.id IS NULL
      ORDER BY p.created_at DESC
      `,
      [workerId]
    );

    return NextResponse.json(
      {
        worker: {
          id: worker.id,
          username: worker.username,
        },
        data: rows,
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
