import api from '@/services/api';
import { GetLoginResponse, getLoginResponseSchema, Login } from '../schema/login.schema';

export const login = async (payload: Login): Promise<GetLoginResponse> => {
  const { data: respData } = await api.post('/auth/login', payload);
  const { success, data: parseData, error } = getLoginResponseSchema.safeParse(respData);
  if (!success) {
    console.error('Zod validation failed:', error);
    throw new Error('Invalid user response from API');
  }
  return parseData;
};
