import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  username: text('username').unique(),
  displayUsername: text('displayUsername'),
  disabled: boolean('disabled').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

export const clubRole = pgTable('club_role', {
  userId: text('userId').primaryKey(),
  role: text('role').notNull().default('member'),
  fonction: text('fonction'),
  permissions: text('permissions').array().notNull().default([]),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const memberApplication = pgTable('member_application', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull().unique(),
  lastName: text('lastName').notNull(),
  firstNames: text('firstNames').notNull(),
  birthDate: date('birthDate').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  filiere: text('filiere').notNull(),
  niveau: text('niveau').notNull(),
  paymentMethod: text('paymentMethod').notNull(),
  transactionRef: text('transactionRef'),
  motivation: text('motivation').notNull(),
  photo: text('photo').notNull(),
  status: text('status').notNull().default('pending'),
  rejectionReason: text('rejectionReason'),
  memberNumber: text('memberNumber').unique(),
  reviewedBy: text('reviewedBy'),
  reviewedAt: timestamp('reviewedAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const weeklyContribution = pgTable('weekly_contribution', {
  id: serial('id').primaryKey(),
  userId: text('userId').notNull(),
  weekStart: date('weekStart').notNull(),
  amount: integer('amount').notNull().default(500),
  method: text('method').notNull(),
  reference: text('reference'),
  recordedBy: text('recordedBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const activity = pgTable('activity', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  date: date('date').notNull(),
  time: text('time'),
  location: text('location'),
  description: text('description').notNull(),
  imageUrl: text('imageUrl'),
  responsable: text('responsable'),
  published: boolean('published').notNull().default(false),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const announcement = pgTable('announcement', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(false),
  publishAt: timestamp('publishAt'),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const announcementRead = pgTable(
  'announcement_read',
  {
    userId: text('userId').notNull(),
    announcementId: integer('announcementId').notNull(),
    readAt: timestamp('readAt').notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.announcementId] })],
)

export const document = pgTable('document', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  url: text('url').notNull(),
  published: boolean('published').notNull().default(true),
  createdBy: text('createdBy').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  actorId: text('actorId').notNull(),
  actorName: text('actorName').notNull(),
  action: text('action').notNull(),
  target: text('target'),
  details: text('details'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})
