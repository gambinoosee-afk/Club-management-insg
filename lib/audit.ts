import 'server-only'
import { db } from '@/lib/db'
import { auditLog } from '@/lib/db/schema'
import type { CurrentUser } from '@/lib/session'

export async function logAudit(
  actor: Pick<CurrentUser, 'id' | 'name'>,
  action: string,
  target?: string,
  details?: string,
) {
  await db.insert(auditLog).values({
    actorId: actor.id,
    actorName: actor.name,
    action,
    target: target ?? null,
    details: details ?? null,
  })
}
