// middleware/authorizeRole.ts
import { NextFunction, Response } from 'express';
import { AuthRequest } from '../schemas/authSchemas';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const authorizeRole = (...allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            throw new AppError(
                'FORBIDDEN',
                `Role '${userRole}' is not authorized to access this route`,
                StatusCodes.FORBIDDEN
            );
        }

        next();
    };
};
