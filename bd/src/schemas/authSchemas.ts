import { z } from 'zod';
import { Role } from '../types/user.type';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password is required' }),
});

export const signupSchema = z.object({
    name: z.string().min(5, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.nativeEnum(Role, {
        errorMap: () => ({ message: 'Invalid role' })
    }),
});
