// src/modules/user/api/getUser.schema.ts
import { z } from 'zod';
import { Role } from '@/app/types/roles';

const loginResponseSchema = z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Role).refine((val) => !!val, { message: 'Role is required' }),
    token: z.string()
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6),
});

export const getLoginResponseSchema = z.object({
    data: loginResponseSchema,
});
export type loginDTO = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

