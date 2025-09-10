import { NextResponse } from "next/server"
import { sql } from "@/server/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/server/auth"

export async function GET() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role
  if (role !== "ADMIN") {
    return new NextResponse("Forbidden", { status: 403 })
  }
  const [q, t, p, o, n, s] = await Promise.all([
    sql`select count(*)::int as count from quotes`,
    sql`select count(*)::int as count from testimonies`,
    sql`select count(*)::int as count from prayer_requests`,
    sql`select count(*)::int as count from outreach_photos`,
    sql`select count(*)::int as count from news_articles`,
    sql`select count(*)::int as count from services`,
  ])
  const quotes = q[0]?.count ?? 0
  const testimonies = t[0]?.count ?? 0
  const prayers = p[0]?.count ?? 0
  const outreach = o[0]?.count ?? 0
  const news = n[0]?.count ?? 0
  const services = s[0]?.count ?? 0
  return NextResponse.json({ quotes, testimonies, prayers, outreach, news, services })
}
