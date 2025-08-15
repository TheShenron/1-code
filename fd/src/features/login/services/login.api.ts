import api from '@/services/api';
import { getLoginResponseSchema, Login, LoginResponse } from '../schema/login.schema';


export const login = async(payload: Login): Promise<LoginResponse> => {
  const { data: respData } = await api.post('/auth/login', payload);
  const { success, data, error } = getLoginResponseSchema.safeParse(respData);
  if (!success) {
    console.error('Zod validation failed:', error);
    throw new Error('Invalid user response from API');
  }
  return data.data;
};
