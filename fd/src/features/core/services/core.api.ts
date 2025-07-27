import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { GetUserResponse, getUserResponseSchema } from './core.schema';


export const useUserData = () => {
    return useQuery<GetUserResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await api.get('/users');
            console.log(data, "kkk")

            const result = getUserResponseSchema.safeParse(data);

            if (!result.success) {
                console.error('Zod validation failed:', result);
                throw new Error('Invalid user data from API');
            }

            return result.data;
        },
        // staleTime: 5 * 60 * 1000,
    });
};
