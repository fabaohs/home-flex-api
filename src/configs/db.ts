import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "../shared/entities/index.ts";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgres://user:password@localhost:5432/db",
});

export const db = drizzle(pool, {
  schema: schemas,
});
