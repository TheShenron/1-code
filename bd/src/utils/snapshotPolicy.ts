import { Role, UserPayload } from "../schemas/authSchemas";

export const canTakeSnapShot = (user: UserPayload, userID: string): boolean => {
    if (user.role === Role.ADMIN) return true;
    return user.id === userID;
};