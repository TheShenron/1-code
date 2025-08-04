// src/middlewares/rateLimiters.ts
import rateLimit from 'express-rate-limit';

// Login limiter – 5 attempts / 15 minutes
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        success: false,
        message: 'Too many login attempts. Try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Signup limiter – 10 attempts / hour
export const signupLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        success: false,
        message: 'Too many signup attempts. Try again in 1 hour.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API limiter – 1000 requests / 10 minutes
export const generalApiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000,
    message: {
        success: false,
        message: 'Too many requests. Try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
