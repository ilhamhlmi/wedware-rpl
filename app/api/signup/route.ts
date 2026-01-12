import { NextResponse } from "next/server";
import {db} from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, phone, username, password } = await req.json();

    if (!email || !phone || !username || !password) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email, username]
    );

    if ((existing as any[]).length > 0) {
      return NextResponse.json(
        { message: "Email atau username sudah terdaftar" },
        { status: 409 }
      );
    }

    await db.query(
      "INSERT INTO users (email, phone, username, password, role) VALUES (?, ?, ?, ?, ?)",
      [email, phone, username, password, "user"]
    );

    return NextResponse.json(
      { message: "Registrasi berhasil" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
