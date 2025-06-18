import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from '@/schema/user';
import { drivers } from '@/schema/drivers';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema: { users, drivers } });
