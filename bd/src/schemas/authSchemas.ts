import { z } from 'zod';
import { Request } from "express";
import { DateTime } from 'luxon';

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}
export interface UserPayload {
    id: string;
    email: string;
    role: Role
}
export interface AuthRequest extends Request {
    user?: UserPayload;
}

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password is required' }),
});
export type Login = z.infer<typeof loginSchema>

export const signupSchema = z.object({
    name: z.string().min(5, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.nativeEnum(Role, {
        errorMap: () => ({ message: 'Invalid role' })
    }),
    timezone: z
        .string()
        .default('Asia/Kolkata')
        .refine((tz) => DateTime.now().setZone(tz).isValid, {
            message: 'Invalid timezone string',
        }),
});
export type Signup = z.infer<typeof signupSchema>
