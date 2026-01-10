import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userId = request.cookies.get("user_id")?.value;
  const userRole = request.cookies.get("user_role")?.value;

    // contoh path nanti
//   // USER ROUTES
//   const userRoutes = [
//     "/guide",
//     "/konsultasi",
//     "/userProfile",
//     "/homeService",
//   ];

  // LOGIN PAGE GUARD
  if (pathname === "/login" && userId && userRole) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (userRole === "worker") {
      return NextResponse.redirect(new URL("/worker/dashboard", request.url));
    }

    if (userRole === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/user/:path*",
    "/admin/:path*",
    "/worker/:path*",
  ],
};

