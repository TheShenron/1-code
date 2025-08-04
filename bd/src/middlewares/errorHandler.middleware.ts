import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isAppError = err instanceof AppError;

    const statusCode = isAppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        success: false,
        data: null,
        message: err.message || 'Internal Server Error',
        error: {
            code: isAppError ? err.code : 'INTERNAL_ERROR',
            message: err.message || 'Unexpected error occurred',
            details: err.details || null
        }
    });
};
