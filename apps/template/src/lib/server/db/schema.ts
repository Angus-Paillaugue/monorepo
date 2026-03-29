import type { UUID } from '$lib/types';
import { sql } from 'drizzle-orm';
import { uuid, pgTable, varchar } from 'drizzle-orm/pg-core';
// import { createSelectSchema } from "drizzle-orm/zod";

export const userTable = pgTable('user', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => sql<UUID>`uuidv7()`),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
});
// export const userSelectSchema = createSelectSchema(userTable);
