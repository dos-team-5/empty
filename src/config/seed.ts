// src/config/seed.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { users } from '@/schema/user';

// Load environment variables from .env file
dotenv.config();

const main = async () => {
  // --- All async logic is now inside this function ---

  const DATABASE_URL = process.env.DATABASE_URL;
  const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
  const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;
  const SUPER_ADMIN_NAME = process.env.SUPER_ADMIN_NAME || 'Super Admin';

  if (!DATABASE_URL || !SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
    console.error(
      'Missing required environment variables: DATABASE_URL, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD'
    );
    process.exit(1);
  }

  // Use the 'pg' Client
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    // Connect the client inside the async function
    await client.connect();
    // Pass the client to drizzle with schema
    const db = drizzle(client, { schema: { users } });

    console.log('Seeding database...');

    // Check if the super admin already exists
    const existingAdmin = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, SUPER_ADMIN_EMAIL!),
    });

    if (existingAdmin) {
      console.log('Super admin already exists. Seeding skipped.');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD!, 10);

      // Create the super admin user
      await db.insert(users).values({
        name: SUPER_ADMIN_NAME,
        email: SUPER_ADMIN_EMAIL!,
        password: hashedPassword,
        role: 'super_admin',
      });

      console.log('✅ Super admin created successfully!');
    }
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // This ensures the database connection is always closed.
    await client.end();
    console.log('Database connection closed.');
  }
};

// Execute the main async function
main().catch((err) => {
  console.error('An unexpected error occurred while seeding:', err);
  process.exit(1);
});
