export const CLUB = {
  name: 'Club Management',
  school: 'INSG',
  fullName: 'Club Management — INSG',
  academicYear: '2026–2027',
  officialEmail: 'lebureauclubmanagement@gmail.com',
  presidentEmail: 'tchingamassalhaosee@gmail.com',
  adhesionFee: 2000,
  weeklyFee: 500,
} as const

export const PAYMENT_METHODS = {
  airtel: { label: 'Airtel Money', number: '077 344 967' },
  moov: { label: 'Moov Money', number: '062 001 535' },
} as const

export type PaymentMethod = keyof typeof PAYMENT_METHODS

export const CONTRIBUTION_METHODS = {
  ...PAYMENT_METHODS,
  especes: { label: 'Espèces', number: '' },
} as const

export const FILIERES = [
  'Management',
  'Gestion des ressources humaines',
  'Comptabilité, contrôle, audit',
  'Banque et finance',
  'Marketing et communication',
  'Logistique et transport',
  'Informatique de gestion',
  'Autre',
] as const

export const NIVEAUX = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2'] as const

export const APPLICATION_STATUS = {
  pending: { label: 'En attente de vérification', tone: 'warning' },
  approved: { label: 'Adhésion validée', tone: 'success' },
  rejected: { label: 'Demande rejetée', tone: 'danger' },
  suspended: { label: 'Adhésion suspendue', tone: 'muted' },
} as const

export type ApplicationStatus = keyof typeof APPLICATION_STATUS

export const ACTIVITY_CATEGORIES = [
  'Conférence',
  'Atelier',
  'Rencontre',
  'Projet collectif',
  'Réunion',
  'Autre',
] as const

export const DOCUMENT_CATEGORIES = [
  'Présentation',
  'Programme',
  'Information',
  'Règlement',
  'Autre',
] as const

export function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} FCFA`
}

export function formatDate(value: string | Date, opts?: Intl.DateTimeFormatOptions) {
  const d = typeof value === 'string' ? new Date(value.length === 10 ? `${value}T00:00:00` : value) : value
  return new Intl.DateTimeFormat('fr-FR', opts ?? { day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}
