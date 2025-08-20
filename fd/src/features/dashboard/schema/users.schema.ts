// src/modules/user/api/getUser.schema.ts
import { z } from 'zod';
import { Role } from '@/app/types/roles';

const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Role).refine(val => !!val, { message: 'Role is required' }),
    timezone: z.string()
});
export type User = z.infer<typeof userSchema>;

export const userSchemaResponse = z.object({
    data: z.object({
        users: z.array(userSchema)
    }),
    message: z.string(),
    success: z.boolean(),
});
export type UserResponse = z.infer<typeof userSchemaResponse>;
