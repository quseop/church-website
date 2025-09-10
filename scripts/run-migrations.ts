import fs from 'fs'
import path from 'path'
import 'dotenv/config'
import { sql } from '@/server/db'

async function run() {
  const dir = path.join(process.cwd(), 'db', 'migrations')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort()
  for (const f of files) {
    const p = path.join(dir, f)
    const content = fs.readFileSync(p, 'utf-8')
    console.log(`Applying migration: ${f}`)
    const statements = content.split(/;\s*\n/).map(s => s.trim()).filter(Boolean)
    for (const stmt of statements) {
      await sql([stmt] as any)
    }
  }
  console.log('Migrations applied')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})

