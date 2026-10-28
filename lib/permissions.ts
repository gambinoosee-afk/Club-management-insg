export const PERMISSIONS = {
  'applications.view': 'Consulter les demandes d’adhésion',
  'applications.review': 'Valider ou rejeter les adhésions et paiements',
  'members.view': 'Consulter les dossiers des membres',
  'members.edit': 'Modifier les informations administratives',
  'payments.manage': 'Enregistrer les cotisations hebdomadaires',
  'reports.finance': 'Rapports financiers',
  'reports.admin': 'Rapports administratifs',
  'activities.manage': 'Préparer les activités (brouillons)',
  'activities.publish': 'Publier les activités',
  'announcements.manage': 'Préparer les annonces (brouillons)',
  'announcements.publish': 'Publier les annonces',
  'documents.manage': 'Gérer les documents publics',
  'audit.view': 'Consulter l’historique des opérations',
} as const

export type Permission = keyof typeof PERMISSIONS | 'staff.manage'

export const ROLES = {
  president: 'Président',
  tresorier: 'Trésorier',
  sg: 'Secrétaire général',
  officer: 'Responsable',
  member: 'Membre',
} as const

export type Role = keyof typeof ROLES

const ALL = Object.keys(PERMISSIONS) as Permission[]

export const ROLE_DEFAULTS: Record<Role, Permission[]> = {
  president: [...ALL, 'staff.manage'],
  tresorier: [
    'applications.view',
    'applications.review',
    'members.view',
    'payments.manage',
    'reports.finance',
    'audit.view',
  ],
  sg: [
    'applications.view',
    'members.view',
    'members.edit',
    'reports.admin',
    'documents.manage',
    'activities.manage',
  ],
  officer: [],
  member: [],
}

export function effectivePermissions(role: Role, custom: string[]): Set<Permission> {
  const set = new Set<Permission>(ROLE_DEFAULTS[role] ?? [])
  if (role !== 'member') {
    for (const p of custom) if (p in PERMISSIONS) set.add(p as Permission)
  }
  return set
}

export function isRole(value: string): value is Role {
  return value in ROLES
}
