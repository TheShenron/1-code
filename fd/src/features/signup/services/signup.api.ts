import { getSignupResponseSchema, SignUpFormDTO, UserResponse } from '../schema/signup.schema';
import api from '@/services/api';

export const createUser = async (payload: SignUpFormDTO): Promise<UserResponse> => {
    const { data: respData } = await api.post('/users', payload);
    const { success, data, error } = getSignupResponseSchema.safeParse(respData);
    if (!success) {
        console.error('Zod validation failed:', error);
        throw new Error('Invalid user response from API');
    }
    return data.data;
};

