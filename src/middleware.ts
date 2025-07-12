import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   if (req.nextUrl.pathname === "/") {
//     return NextResponse.redirect(new URL("/me", req.url));
//   }
// }

// export const config = {
//   matcher: ["/"], // Only apply middleware on "/"
// };

const PUBLIC_PATHS = ["/login", "/auth/login", "/"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Not logged in at all
  if (!token) {
    // Block /me or /admin without login
    if (pathname.startsWith("/me")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
  }

  // --- ALREADY LOGGED IN ---

  const userRole = token.role;

  // Block login pages for logged-in users
  if (PUBLIC_PATHS.includes(pathname)) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.redirect(new URL("/me", req.url));
  }

  // Role-based route protection
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/me", req.url));
  }

  if (pathname.startsWith("/me") && userRole !== "user") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/me/:path*", "/login", "/auth/login"],
};
