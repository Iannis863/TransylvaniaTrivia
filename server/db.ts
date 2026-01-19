import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // Neon requires SSL. This specific config is the most stable for Vercel
  ssl: {
    rejectUnauthorized: false 
  },
  // Serverless functions should not hold onto connections
  max: 1, 
  connectionTimeoutMillis: 5000, // 5 second timeout so it doesn't hang forever
});

export const db = drizzle(pool, { schema });
