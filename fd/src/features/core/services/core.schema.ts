// src/modules/user/api/getUser.schema.ts
import { z } from 'zod';
import { Role } from '@/app/types/roles';

export const getUserSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    // subscriptionStatus: z.boolean(),
    // role: z.enum(Role),
});

export const getUserResponseSchema = z.object({
    data: z.array(getUserSchema),
});

export type UserData = z.infer<typeof getUserSchema>;
export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

