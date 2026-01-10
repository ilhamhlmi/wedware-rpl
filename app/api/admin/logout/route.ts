import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout admin berhasil" },
    { status: 200 }
  );

  response.cookies.delete("admin_id");
  response.cookies.delete("admin_role");

  return response;
}
