import mongoose, { Schema } from 'mongoose';
import { Signup } from '../schemas/authSchemas';

const userSchema = new Schema<Signup>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    timezone: { type: String, default: 'Asia/Kolkata' },
  },
  { timestamps: true }
);

export const User = mongoose.model<Signup>('User', userSchema);

