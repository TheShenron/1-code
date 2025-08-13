import { Role } from '@/app/types/roles';
import { z } from 'zod';

const signupResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Role),
  })
});

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(6),
  role: z.enum(Role).refine((val) => !!val, { message: 'Role is required' }),
});

export const getSignupResponseSchema = z.object({
  data: signupResponseSchema,
  success: z.boolean(),
  message: z.string()
});
export type SignUpFormDTO = z.infer<typeof signupSchema>;
export type UserResponse = z.infer<typeof signupResponseSchema>;