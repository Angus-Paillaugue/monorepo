import z from 'zod';

export const UUID = z.uuidv7();
export type UUID = z.infer<typeof UUID>;

// export type User = userTable.$inferSelect;
