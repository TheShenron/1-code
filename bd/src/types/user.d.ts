import { Role } from "../models/User.model";
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: Role
}