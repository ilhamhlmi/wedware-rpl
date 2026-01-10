import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // USER COOKIE
  const userId = request.cookies.get("user_id_user")?.value;
  const userRole = request.cookies.get("user_role_user")?.value;

  // ADMIN COOKIE
  const adminId = request.cookies.get("user_id_admin")?.value;
  const adminRole = request.cookies.get("user_role_admin")?.value;

  // WORKER COOKIE
  const workerId = request.cookies.get("user_id_worker")?.value;
  const workerRole = request.cookies.get("user_role_worker")?.value;

  /* LOGIN PAGE GUARD */

  // USER LOGIN
  if (pathname === "/login") {
    if (userId && userRole === "user") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // ADMIN LOGIN
  if (pathname === "/admin/login") {
    if (adminId && adminRole === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // WORKER LOGIN
  if (pathname === "/worker/login") {
    if (workerId && workerRole === "worker") {
      return NextResponse.redirect(
        new URL("/worker/dashboard", request.url)
      );
    }
    return NextResponse.next();
  }

  /* USER AREA */
  if (pathname.startsWith("/user")) {
    if (!userId || userRole !== "user") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  /* ADMIN AREA */
  if (pathname.startsWith("/admin")) {
    if (!adminId || adminRole !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  /* WORKER AREA */
  if (pathname.startsWith("/worker")) {
    if (!workerId || workerRole !== "worker") {
      return NextResponse.redirect(new URL("/worker/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/user/:path*",
    "/admin/login",
    "/admin/:path*",
    "/worker/login",
    "/worker/:path*",
  ],
};
