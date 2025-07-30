// features/auth/hooks/useSignUpForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login.api';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../slice';

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
});

export type LoginFormValues = z.infer<typeof schema>;

export const useLoginForm = () => {

    const dispatch = useDispatch()

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const createUserMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log('Login successfully:', data);
            dispatch(setUserDetails(data))
            // maybe redirect or show success toast here
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    const onSubmit = methods.handleSubmit((formData) => {
        createUserMutation.mutate(formData);
    });

    return { ...methods, onSubmit };
};
