import { pgEnum } from 'drizzle-orm/pg-core';
import { pgTable, integer } from 'drizzle-orm/pg-core';

export const profileEnum = pgEnum('profile_enum', ['ADMIN', 'USER']);

export const usersEnterprises = pgTable('users_enterprises', {
  userId: integer('user_id').notNull(),
  enterpriseId: integer('enterprise_id').notNull(),
  profileId: profileEnum('profile_id').notNull(),
});

export type UserEnterprise = typeof usersEnterprises.$inferSelect;
