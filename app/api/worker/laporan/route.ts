import { NextResponse } from "next/server";
import pool from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const peminjamanId = formData.get("peminjaman_id");
    const file = formData.get("bukti_pembayaran") as File | null;

    const cookieStore = await cookies();
    const workerId = cookieStore.get("user_id_worker")?.value;
    const role = cookieStore.get("user_role_worker")?.value;

    if (!peminjamanId || !file || !workerId || role !== "worker") {
      return NextResponse.json(
        { message: "Data tidak lengkap / Unauthorized" },
        { status: 400 }
      );
    }

    // Ambil data peminjaman
    const [rows] = await pool.query(
      `
      SELECT 
        p.detail_peminjaman,
        p.ongkos_pp,
        p.biaya_peminjaman,
        u.username AS nama_customer,
        w.username AS nama_worker
      FROM peminjaman p
      JOIN users u ON p.user_id = u.id
      JOIN users w ON p.worker_id = w.id
      WHERE p.id = ? AND p.worker_id = ?
      `,
      [peminjamanId, workerId]
    );

    const data = (rows as any[])[0];
    if (!data) {
      return NextResponse.json(
        { message: "Peminjaman tidak valid" },
        { status: 404 }
      );
    }

    // Simpan file
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `bukti-${Date.now()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), "public/uploads");

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    // Simpan laporan
    await pool.query(
      `
      INSERT INTO laporan_worker
      (
        peminjaman_id,
        worker_id,
        nama_customer,
        nama_worker,
        detail_peminjaman,
        ongkos_pp,
        biaya_peminjaman,
        bukti_pembayaran
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        peminjamanId,
        workerId,
        data.nama_customer,
        data.nama_worker,
        data.detail_peminjaman,
        data.ongkos_pp,
        data.biaya_peminjaman,
        `/uploads/${fileName}`
      ]
    );

    return NextResponse.json(
      { message: "Laporan berhasil dikirim" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
