import { pgTable, serial, varchar, text, pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'general_user',
  'regular_admin',
  'super_admin',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  role: userRoleEnum('role').notNull().default('general_user'),
  phone: varchar('phone', { length: 20 }),
  refreshToken: text('refresh_token'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
