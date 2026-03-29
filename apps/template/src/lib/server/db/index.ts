import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/bun-sql';
import * as schema from './schema';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
  schema,
});
