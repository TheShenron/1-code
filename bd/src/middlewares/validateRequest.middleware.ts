import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../constants/errors.constant';
const { FAILED } = ERROR_MESSAGES.FORM_VALIDATION

type SchemaMap = {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
};

export const validateRequest =
    (schemas: SchemaMap) => (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }

            next();
        } catch (err: any) {
            const issue = err.errors?.[0];
            throw new AppError(
                FAILED.code,
                issue?.message || FAILED.message,
                StatusCodes.BAD_REQUEST,
                { issues: err.errors }
            );
        }
    };
