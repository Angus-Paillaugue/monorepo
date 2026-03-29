import bcrypt from 'bcryptjs';
import type { Actions } from './$types';
import { generateAccessToken } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getCookiePrefix } from '$lib/server/utils';
import { formSchema } from './schema';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
  logIn: async ({ cookies, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const form = formSchema.safeParse(formData);
    if (!form.success) {
      const errors = form.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return fail(400, { error: true, errors });
    }

    const { username, password, rememberMe } = form.data;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.username, username))
      .limit(1);
    if (!user) {
      return fail(400, {
        error: true,
        errors: [{ field: 'username', message: 'No account associated with that username' }],
      });
    }
    const compare = await bcrypt.compare(password, user.passwordHash!);

    if (!compare)
      return fail(400, {
        error: true,
        message: 'Invalid credentials',
      });

    cookies.set(getCookiePrefix('token'), generateAccessToken(user.id), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: env.NODE_ENV === 'production',
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : undefined, // 30 days if rememberMe is true
    });
    redirect(303, '/app');
  },
};
