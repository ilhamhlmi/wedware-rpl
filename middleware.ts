import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // COOKIE UMUM
  const userId = request.cookies.get("user_id")?.value;
  const userRole = request.cookies.get("user_role")?.value;

  // contoh apth nanti
//   // USER ROUTES
//   const userRoutes = [
//     "/guide",
//     "/konsultasi",
//     "/userProfile",
//     "/homeService",
//   ];

  // USER AREA
  if (pathname.startsWith("/user")) {
    if (!userId || userRole !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // ADMIN AREA
  if (pathname.startsWith("/admin")) {
    if (!userId || userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // WORKER AREA
  if (pathname.startsWith("/worker")) {
    if (!userId || userRole !== "worker") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // LOGIN PAGE GUARD
  if (pathname === "/login" && userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/worker/:path*",
    "/login",
  ],
};
