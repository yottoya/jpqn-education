import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSql() {
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL!);
  }
  return _sql;
}

export function getDb() {
  return drizzle(getSql(), { schema });
}
