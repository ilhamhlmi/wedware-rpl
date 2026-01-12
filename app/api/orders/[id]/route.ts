import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await req.json()

    if (!["pending", "progress", "done"].includes(status)) {
      return NextResponse.json(
        { message: "Status tidak valid" },
        { status: 400 }
      )
    }

    await db.execute(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, params.id]
    )

    return NextResponse.json({ message: "Status berhasil diupdate" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Gagal update status" },
      { status: 500 }
    )
  }
}
