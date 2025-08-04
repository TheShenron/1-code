import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../constants/errors.constant';
import { SUCCESS_MESSAGES } from '../constants/success.constant';
import { findUserByEmail } from '../services/user.service';
const { INVALID_CREDENTIALS } = ERROR_MESSAGES.AUTH
const { LOGIN_SUCCESS } = SUCCESS_MESSAGES.AUTH

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? '3600');

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        throw new AppError(INVALID_CREDENTIALS.code, INVALID_CREDENTIALS.message, StatusCodes.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new AppError(INVALID_CREDENTIALS.code, INVALID_CREDENTIALS.message, StatusCodes.BAD_REQUEST);
    }



    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _password, ...userWithoutPassword } = user.toObject();

    res.locals.data = { token, user: userWithoutPassword };
    res.locals.message = LOGIN_SUCCESS.message;
    next()
};
