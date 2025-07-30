import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from '../models/User.model';
import bcrypt from 'bcrypt';

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN ?? '3600');

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return
    }

    if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    const { password: _password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ data: { token, ...userWithoutPassword } });
};
