// src/modules/user/api/getUser.schema.ts
import { z } from 'zod';
import { Role } from '@/app/types/roles';

const PASSWORD_MIN_LENGTH = 6;

const loginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Role).refine(val => !!val, { message: 'Role is required' }),
  }),
});
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});
export type Login = z.infer<typeof loginSchema>;

export const getLoginResponseSchema = z.object({
  data: loginResponseSchema,
  message: z.string(),
  success: z.boolean(),
});
