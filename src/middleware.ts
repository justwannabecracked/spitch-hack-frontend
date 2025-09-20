import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  if (pathname === "/login" || pathname === "/register") {
    response.cookies.delete("authToken");
    return response;
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
