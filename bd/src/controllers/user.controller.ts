import { NextFunction, Request, Response } from 'express';
import { signupUser } from '../services/user.service';
import { SUCCESS_MESSAGES, } from '../constants/success.constant'
const { CREATED } = SUCCESS_MESSAGES.USER


export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = await signupUser(req.body);

    res.locals.data = { user };
    res.locals.message = CREATED.message;
    next();
};

