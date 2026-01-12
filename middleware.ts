import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // === COOKIE ===
  const adminId = request.cookies.get("admin_id")?.value;
  const adminRole = request.cookies.get("admin_role")?.value;

  const workerId = request.cookies.get("worker_id")?.value;
  const workerRole = request.cookies.get("worker_role")?.value;

  // === LOGIN PAGE GUARD ===

  // ADMIN LOGIN
  if (pathname === "/admin/login") {
    if (adminId && adminRole === "admin") {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url)
      );
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

  // === PROTECTED AREA ===

  // ADMIN AREA
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!adminId || adminRole !== "admin") {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
    return NextResponse.next();
  }

  // WORKER AREA
  if (pathname.startsWith("/worker") && pathname !== "/worker/login") {
    if (!workerId || workerRole !== "worker") {
      return NextResponse.redirect(
        new URL("/worker/login", request.url)
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/login",
    "/admin/:path*",
    "/worker/login",
    "/worker/:path*",
  ],
};
