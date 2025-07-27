import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { GetUserResponse, getUserResponseSchema } from './core.schema';


export const useUserData = () => {
    return useQuery<GetUserResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await api.get('/users');
            const result = getUserResponseSchema.safeParse(data);
            if (!result.success) {
                console.error('Zod validation failed:', result);
                throw new Error('Invalid user data from API');
            }
            return result.data;
        },
    });
};
