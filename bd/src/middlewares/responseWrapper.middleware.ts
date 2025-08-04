import { Request, Response, NextFunction } from 'express';
import { ERROR_MESSAGES } from '../constants/errors.constant';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../utils/AppError';
const { MISSING_PAYLOAD } = ERROR_MESSAGES.RESPONSE

export const responseWrapper = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (res.locals.data !== undefined) {
        res.status(200).json({
            success: true,
            data: res.locals.data,
            message: res.locals.message || 'Success',
            error: null
        });
    } else {
        throw new AppError(MISSING_PAYLOAD.code, MISSING_PAYLOAD.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
