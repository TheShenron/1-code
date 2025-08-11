import { NextFunction, Request, Response } from 'express';
import { signupUser } from '../services/user.service';
import { SUCCESS_MESSAGES, } from '../constants/success.constant'
const { LOGIN_SUCCESS } = SUCCESS_MESSAGES.AUTH


export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = await signupUser(req.body);

    res.locals.data = { user };
    res.locals.message = LOGIN_SUCCESS.message;
    next();
};

