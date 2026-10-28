import 'server-only'
import { like } from 'drizzle-orm'
import { db } from '@/lib/db'
import { memberApplication } from '@/lib/db/schema'

export function memberNumberBase(lastName: string, firstNames: string, birthDate: string) {
  const initials = `${lastName} ${firstNames}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase())
    .filter((c) => /[A-Z]/.test(c))
    .join('')
  return `${initials}${birthDate.slice(0, 4)}`
}

export async function generateMemberNumber(lastName: string, firstNames: string, birthDate: string) {
  const base = memberNumberBase(lastName, firstNames, birthDate)
  const existing = await db
    .select({ n: memberApplication.memberNumber })
    .from(memberApplication)
    .where(like(memberApplication.memberNumber, `${base}%`))

  const taken = new Set(existing.map((e) => e.n))
  if (!taken.has(base)) return base
  for (let i = 2; i < 1000; i++) {
    const candidate = `${base}-${String(i).padStart(2, '0')}`
    if (!taken.has(candidate)) return candidate
  }
  throw new Error('Impossible de générer un numéro de membre')
}
