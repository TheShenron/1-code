import { Document } from "mongoose";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: Role
}
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role
}