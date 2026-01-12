import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "Not logged in as user" },
      { status: 401 }
    );
  }

  const [rows]: any = await db.query(
    "SELECT id, username, email, phone, password FROM users WHERE id = ? AND role = 'user'",
    [userId]
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "User not found or not authorized" },
      { status: 403 }
    );
  }

  return NextResponse.json(rows[0]);
}