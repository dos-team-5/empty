import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local file
dotenv.config({ path: resolve(process.cwd(), '.env') });

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/*',
  out: './src/migrations',
  dbCredentials: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    ssl: false,
  },
});
