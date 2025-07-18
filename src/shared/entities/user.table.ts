import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

const user = pgTable("users", {
  id: integer("id").generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
});

export { user };
