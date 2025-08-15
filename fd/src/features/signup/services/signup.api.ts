import api from '@/services/api';
import { getSignupResponseSchema, SignupForm, SignupResponse } from '../schema/signup.schema';

export const createUser = async(payload: SignupForm): Promise<SignupResponse> => {
  const { data: respData } = await api.post('/users', payload);
  const { success, data, error } = getSignupResponseSchema.safeParse(respData);
  if (!success) {
    console.error('Zod validation failed:', error);
    throw new Error('Invalid user response from API');
  }
  return data.data;
};

