import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { clubRole, user } from '@/lib/db/schema'
import { effectivePermissions, isRole, type Permission, type Role } from '@/lib/permissions'

export type CurrentUser = {
  id: string
  name: string
  email: string
  username: string | null
  role: Role
  fonction: string | null
  permissions: Set<Permission>
  isStaff: boolean
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return null

  const [row] = await db
    .select({
      disabled: user.disabled,
      username: user.displayUsername,
      role: clubRole.role,
      fonction: clubRole.fonction,
      permissions: clubRole.permissions,
      active: clubRole.active,
    })
    .from(user)
    .leftJoin(clubRole, eq(clubRole.userId, user.id))
    .where(eq(user.id, session.user.id))
    .limit(1)

  if (!row || row.disabled) return null

  const role: Role = row.role && isRole(row.role) && row.active !== false ? row.role : 'member'

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    username: row.username ?? null,
    role,
    fonction: row.fonction ?? null,
    permissions: effectivePermissions(role, row.permissions ?? []),
    isStaff: role !== 'member',
  }
})

export async function requireUser() {
  const current = await getCurrentUser()
  if (!current) redirect('/connexion')
  return current
}

export async function requireStaff() {
  const current = await requireUser()
  if (!current.isStaff) redirect('/espace')
  return current
}

export async function requirePermission(permission: Permission) {
  const current = await requireStaff()
  if (!current.permissions.has(permission)) redirect('/bureau?refus=1')
  return current
}

export function can(current: CurrentUser | null, permission: Permission) {
  return Boolean(current?.permissions.has(permission))
}
