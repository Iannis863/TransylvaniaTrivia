import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Optimized for Serverless: One-time connection logic
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for many hosted DBs
  },
  max: 1 // Only one connection per serverless function to prevent overhead
});

export const db = drizzle(pool, { schema });
