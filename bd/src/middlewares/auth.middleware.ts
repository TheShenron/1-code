import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, UserPayload } from '../types/ticket.type';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError(
            'UNAUTHORIZED',
            'No token provided',
            StatusCodes.UNAUTHORIZED
        );
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;

        if (!decoded || typeof decoded !== 'object') {
            throw new AppError(
                'UNAUTHORIZED',
                'Invalid token payload',
                StatusCodes.UNAUTHORIZED
            );
        }

        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError(
            'UNAUTHORIZED',
            'Invalid or expired token',
            StatusCodes.UNAUTHORIZED
        );
    }
};
