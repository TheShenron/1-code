import { NextFunction, Request, Response } from 'express';
import { getAllUsers, signupUser } from '../services/user.service';
import { SUCCESS_MESSAGES, } from '../constants/success.constant'
const { CREATED, FETCHED_ALL } = SUCCESS_MESSAGES.USER


export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const { user } = await signupUser(req.body);

    res.locals.data = { user };
    res.locals.message = CREATED.message;
    next();
};

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {

    const { users } = await getAllUsers();

    res.locals.data = { users };
    res.locals.message = FETCHED_ALL.message;
    next();
};

