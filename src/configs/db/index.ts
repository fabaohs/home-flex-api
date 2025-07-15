import { drizzle } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "./DATABASE_URL";
import { Pool } from "pg";
import * as schemas from "../../shared/entities/index.ts";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, {
  schema: schemas,
});
