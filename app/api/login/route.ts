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
      "SELECT id, username, email, password, role FROM users WHERE username = ?",
      [username]
    );

    const user = (rows as any[])[0];

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Username atau password salah" },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // COOKIE UMUM (DIBACA MIDDLEWARE)
    response.cookies.set("user_id", String(user.id), { path: "/" });
    response.cookies.set("user_role", user.role, { path: "/" });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
