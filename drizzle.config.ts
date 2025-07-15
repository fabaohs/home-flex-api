import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/",
  schema: "./src/shared/entities/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: "drizzle",
    table: "journal",
  },
});
