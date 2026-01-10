import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout worker berhasil" },
    { status: 200 }
  );

  response.cookies.delete("worker_id");
  response.cookies.delete("worker_role");

  return response;
}
