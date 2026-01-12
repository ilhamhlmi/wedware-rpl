import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/* GET LAPORAN WORKER */
export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT 
        lw.id,
        lw.bukti_pembayaran,
        lw.created_at,

        u.username AS nama_pengguna,
        w.username AS worker,

        o.fitting_date AS fitting,
        o.wedding_date AS wedding,
        o.return_date AS pengembalian,

        lw.ket_ukuran

      FROM laporan_worker lw
      JOIN orders o ON lw.order_id = o.id
      JOIN users u ON o.user_id = u.id
      JOIN users w ON lw.worker_id = w.id
      WHERE w.role = 'worker'
      ORDER BY lw.created_at DESC
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET LAPORAN ERROR:", error);
    return NextResponse.json([], { status: 500 });
  }
}

/* DELETE LAPORAN WORKER */
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID wajib" }, { status: 400 });
    }

    await db.query(
      "DELETE FROM laporan_worker WHERE id = ?",
      [id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE LAPORAN ERROR:", error);
    return NextResponse.json(
      { message: "Gagal menghapus laporan" },
      { status: 500 }
    );
  }
}
