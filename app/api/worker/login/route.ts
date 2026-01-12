import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const [rows] = await db.query(
      "SELECT id, password FROM users WHERE username = ? AND role = 'worker'",
      [username]
    );

    const worker = (rows as any[])[0];

    if (!worker || worker.password !== password) {
      return NextResponse.json(
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "Login worker berhasil" },
      { status: 200 }
    );

    // HAPUS COOKIE ADMIN JIKA ADA
    response.cookies.delete("admin_id");
    response.cookies.delete("admin_role");

    // SET COOKIE WORKER
    response.cookies.set("worker_id", String(worker.id), {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    response.cookies.set("worker_role", "worker", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
