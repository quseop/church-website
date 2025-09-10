import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request })
    const isLogin = pathname === "/admin/login"
    if (!token && !isLogin) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    const role = (token as { role?: string } | null)?.role
    if (role !== "ADMIN" && !isLogin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }
