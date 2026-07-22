import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const connectionString = process.env.DB_URL!;

const pool = new Pool({
  connectionString,
});

export const db = drizzle({ client: pool });
