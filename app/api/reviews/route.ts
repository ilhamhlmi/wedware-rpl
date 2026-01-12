import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET – ambil semua ulasan
export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, message, created_at FROM reviews ORDER BY created_at DESC"
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}

// POST – tambah ulasan (punyamu sudah ada, ini contoh aman)
export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await db.query(
      "INSERT INTO reviews (name, message) VALUES (?, ?)",
      [name, message]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE – HAPUS ulasan
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await db.query("DELETE FROM reviews WHERE id = ?", [id]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
