import { User } from '../models/User.model';
import { AppError } from '../utils/AppError';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../constants/errors.constant';
import { Login, Signup } from '../schemas/authSchemas';
const { INVALID_CREDENTIALS } = ERROR_MESSAGES.AUTH
const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? '3600');
const { EMAIL_ALREADY_EXISTS } = ERROR_MESSAGES.USER


export const loginUser = async (data: Login) => {

    const { email, password } = data
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(
            INVALID_CREDENTIALS.code,
            INVALID_CREDENTIALS.message,
            StatusCodes.BAD_REQUEST
        );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(
            INVALID_CREDENTIALS.code,
            INVALID_CREDENTIALS.message,
            StatusCodes.BAD_REQUEST
        );
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
        token,
        user: userWithoutPassword,
    };
};

export const signupUser = async (data: Signup) => {

    const { name, email, password, role } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError(
            EMAIL_ALREADY_EXISTS.code,
            EMAIL_ALREADY_EXISTS.message,
            StatusCodes.CONFLICT
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const created_user = new User({ name, email, password: hashedPassword, role });
    const save_user = await created_user.save();
    const userObj = save_user.toObject() as any;
    delete userObj.password;

    return { user: userObj };

};