import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import bcrypt from 'bcrypt';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({
            data: users,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const User = await userService.createUser({ name, email, password: hashedPassword, role });
        const userObj = User.toObject();
        delete userObj.password;

        res.status(201).json({ data: userObj });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user' });
    }
};
