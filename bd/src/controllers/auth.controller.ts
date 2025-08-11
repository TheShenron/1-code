import { NextFunction, Request, Response } from 'express';
import { SUCCESS_MESSAGES } from '../constants/success.constant';
import { loginUser } from '../services/user.service';
const { LOGIN_SUCCESS } = SUCCESS_MESSAGES.AUTH


export const login = async (req: Request, res: Response, next: NextFunction) => {

    const { token, user } = await loginUser(req.body);

    res.locals.data = { token, user };
    res.locals.message = LOGIN_SUCCESS.message;
    next();
};
