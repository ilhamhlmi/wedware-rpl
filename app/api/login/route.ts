import { NextResponse } from "next/server";
import {db} from "@/lib/db";

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
      "SELECT id, username, email, password FROM users WHERE username = ? AND role = 'user'",
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
      { message: "Login berhasil" },
      { status: 200 }
    );

    response.cookies.set("user_id", String(user.id), {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("user_role", "user", {
      httpOnly: true,
      path: "/",
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
