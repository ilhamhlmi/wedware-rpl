import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, username,phone, email, created_at FROM users WHERE role = 'user'"
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}
