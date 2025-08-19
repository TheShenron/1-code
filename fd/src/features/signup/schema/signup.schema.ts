import { Role } from '@/app/types/roles';
import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 6;
const NAME = 1;

const signupResponseSchema = z.object({
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.email(),
    role: z.enum(Role),
  }),
});
export type SignupResponse = z.infer<typeof signupResponseSchema>;

export const signupFormSchema = z.object({
  name: z.string().min(NAME),
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
  role: z.enum(Role).refine(val => !!val, { message: 'Role is required' }),
});
export type SignupForm = z.infer<typeof signupFormSchema>;

export const getSignupResponseSchema = z.object({
  data: signupResponseSchema,
  success: z.boolean(),
  message: z.string(),
});
export type GetSignupResponse = z.infer<typeof getSignupResponseSchema>;
