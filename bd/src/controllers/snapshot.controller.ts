import { Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../schemas/authSchemas';
import { SUCCESS_MESSAGES } from '../constants/success.constant'
import { canTakeSnapShot } from '../utils/snapshotPolicy';
import { createSnapShot } from '../services/snapshot.service';
const { CREATED } = SUCCESS_MESSAGES.SNAPSHOT

export const createUserDailySnapshot = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;

        if (!canTakeSnapShot(req.user!, userId)) {
            throw new AppError(
                'FORBIDDEN',
                'You are not allowed to take a snapshot for another user.',
                StatusCodes.FORBIDDEN
            );
        }

        const data = await createSnapShot(req.body)

        res.locals.data = { snapshot: data };
        res.locals.message = CREATED.message;
        next()
    } catch (error) {
        next(error);
    }
};
