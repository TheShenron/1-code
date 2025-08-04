import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUsers, findUserByEmail } from '../services/user.service';
import { SUCCESS_MESSAGES, } from '../constants/success.constant'
import { ERROR_MESSAGES, } from '../constants/errors.constant'
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
const { SINGUP_SUCCESS } = SUCCESS_MESSAGES.AUTH
const { EMAIL_ALREADY_EXISTS } = ERROR_MESSAGES.USER

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            throw new AppError(
                EMAIL_ALREADY_EXISTS.code,
                EMAIL_ALREADY_EXISTS.message,
                StatusCodes.CONFLICT
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("ha")
        const User = await createUsers({ name, email, password: hashedPassword, role });
        const userObj = User.toObject();
        delete userObj.password;

        res.locals.data = { user: userObj };
        res.locals.message = SINGUP_SUCCESS.message;
        next()
    } catch (error) {
        next(error)
    }
};
