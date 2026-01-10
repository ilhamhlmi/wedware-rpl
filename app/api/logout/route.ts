import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout user berhasil" },
    { status: 200 }
  );

  response.cookies.delete("user_id");
  response.cookies.delete("user_role");

  return response;
}



































// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function POST() {
//   const cookieStore = await cookies();

//   const response = NextResponse.json(
//     { message: "Logout berhasil" },
//     { status: 200 }
//   );

//   const role =
//     cookieStore.get("user_role_user")?.value ||
//     cookieStore.get("user_role_worker")?.value ||
//     cookieStore.get("user_role_admin")?.value;

//   if (role === "user") {
//     response.cookies.delete("user_id_user");
//     response.cookies.delete("user_role_user");
//   }

//   if (role === "worker") {
//     response.cookies.delete("user_id_worker");
//     response.cookies.delete("user_role_worker");
//   }

//   if (role === "admin") {
//     response.cookies.delete("user_id_admin");
//     response.cookies.delete("user_role_admin");
//   }

//   return response;
// }
