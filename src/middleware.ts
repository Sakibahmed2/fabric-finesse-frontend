import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type TDecodedToken = {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat: number;
};

// Routes that require authentication
const protectedRoutes = ["/profile", "/checkout"];

// Routes that require admin role
const adminRoutes = ["/dashboard"];

// Routes that should redirect to home if already logged in
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  // Try to get token from localStorage via cookie
  // Note: We'll need to sync localStorage token to cookies on login

  let userInfo: TDecodedToken | null = null;

  if (accessToken) {
    try {
      userInfo = jwtDecode<TDecodedToken>(accessToken);

      // Check if token is expired
      if (userInfo.exp * 1000 < Date.now()) {
        userInfo = null;
      }
    } catch {
      userInfo = null;
    }
  }

  // Check if trying to access auth routes while logged in
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (userInfo) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Check if trying to access protected routes without authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!userInfo) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Check if trying to access admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!userInfo) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userInfo.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/checkout/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
