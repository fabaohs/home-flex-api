import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const enterprises = pgTable('enterprises', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity().notNull(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
  deletedAt: timestamp('deleted_at'),
});

export type Enterprise = typeof enterprises.$inferSelect;
