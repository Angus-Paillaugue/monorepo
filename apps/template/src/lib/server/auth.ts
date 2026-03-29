import { env } from '$env/dynamic/private';
import { UUID, type User } from '$lib/types';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { logger } from '@repo/logger';
import { userTable } from './db/schema';
import { eq } from 'drizzle-orm';

/**
 * Authenticates a user based on the provided JWT token.
 */
async function auth(token: string): Promise<User | null> {
  return new Promise((resolve, reject) => {
    if (!token) reject({ error: 'No token was provided!' });
    try {
      jwt.verify(token, env.JWT_SECRET as string, async (err: unknown, decoded: string) => {
        if (err) return reject(err);
        try {
          const uuid = UUID.parse(decoded as string);
          const user = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, uuid))
            .limit(1)
            .then((res) => res[0] || null);
          resolve(user);
        } catch (error) {
          logger.error('User not found:', error);
          reject('User not found');
        }
      });
    } catch (error) {
      logger.error('Error verifying token:', error);
      reject({ error: 'Error verifying token' });
    }
  });
}

function generateAccessToken(id: User['id']): string {
  return jwt.sign(id, env.JWT_SECRET as string);
}

export { auth, generateAccessToken };
