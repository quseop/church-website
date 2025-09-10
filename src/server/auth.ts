import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { compare } from "bcrypt"
import type { NextAuthOptions } from "next-auth"
import { sql } from "./db"

async function getUserByEmail(email: string) {
  const rows = (await sql`
    SELECT id, email, name, password_hash, role FROM users WHERE email = ${email.toLowerCase()}
  `) as unknown as { id: string; email: string; name: string | null; password_hash: string; role: string }[]
  return rows[0] ?? null
}

async function upsertUserRole(email: string, name: string | null, role: string) {
  const rows = (await sql`
    INSERT INTO users (email, name, password_hash, role)
    VALUES (${email.toLowerCase()}, ${name}, '', ${role})
    ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role
    RETURNING id
  `) as unknown as { id: string }[]
  return rows[0]?.id
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await getUserByEmail(credentials.email)
        if (!user) return null
        const valid = await compare(credentials.password, user.password_hash)
        if (!valid) return null
        return { id: user.id, name: user.name ?? null, email: user.email, role: user.role }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const allowlist = (process.env.ALLOWED_ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean)
        if (user?.email) {
          const emailLower = user.email.toLowerCase()
          const role = allowlist.includes(emailLower) ? "ADMIN" : "VIEWER"
          await upsertUserRole(emailLower, user.name ?? null, role)
        }
        return true
      } catch {
        return false
      }
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await getUserByEmail(user.email)
        if (dbUser) {
          ;(token as unknown as { role?: string }).role = dbUser.role
        }
      }
      return token
    },
    async session({ session, token }) {
      // @ts-expect-error extend session
      session.user.role = token.role
      return session
    },
  },
}
