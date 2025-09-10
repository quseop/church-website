import 'dotenv/config'
import { sql } from '@/server/db'
import bcrypt from 'bcrypt'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    console.log('Skipping seed: ADMIN_EMAIL or ADMIN_PASSWORD not set.')
    return
  }
  const hash = await bcrypt.hash(password, 12)
  await sql`INSERT INTO users (email, name, password_hash, role)
    VALUES (${email.toLowerCase()}, 'Admin', ${hash}, 'ADMIN')
    ON CONFLICT (email) DO NOTHING`
  console.log(`Seeded admin user: ${email}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

