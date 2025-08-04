import { User, IUser } from '../models/User.model';
import type { CreateUserDTO } from '../types/user'


export const getAllUsers = async (): Promise<IUser[]> => {
    return User.find().select('-password').lean();;
};

export const findUserByEmail = async (email: string) => {
    return User.findOne({ email });
};

export const createUsers = async (userData: CreateUserDTO): Promise<IUser> => {
    const user = new User(userData);
    return user.save();
};
