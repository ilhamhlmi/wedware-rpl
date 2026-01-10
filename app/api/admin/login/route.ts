import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      "SELECT id, username, email, password FROM users WHERE username = ? AND role = 'admin'",
      [username]
    );

    const admin = (rows as any[])[0];

    if (!admin || admin.password !== password) {
      return NextResponse.json(
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "Login berhasil" },
      { status: 200 }
    );

    response.cookies.set("admin_id", String(admin.id), {
      httpOnly: true,
      path: "/admin",
    });

    response.cookies.set("admin_role", "admin", {
      httpOnly: true,
      path: "/admin",
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
