import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity().notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

export type User = typeof users.$inferSelect;
