import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/bun-sql';
import * as schema from './schema';

const databaseUrl = env.DATABASE_URL || 'postgresql://user:password@localhost:5432/db';

export const db = drizzle({
  connection: {
    url: databaseUrl,
  },
  schema,
});
