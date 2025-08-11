// features/auth/hooks/useSignUpForm.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Role } from '@/app/types/roles';
import { createUser } from '../services/signup.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password too short'),
    role: z.enum(Role).refine((val) => !!val, { message: 'Role is required' }),
});

export type SignUpFormValues = z.infer<typeof schema>;

export const useSignUpForm = () => {
    const navigate = useNavigate()

    const methods = useForm<SignUpFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: Role.GUEST,
        },
    });

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            console.log('User created successfully:', data);
            navigate('/')
            // maybe redirect or show success toast here
        },
        onError: (error) => {
            console.error('User creation failed:', error);
        },
    });

    const onSubmit = methods.handleSubmit((formData) => {
        createUserMutation.mutate(formData);
    });

    return { ...methods, onSubmit };
};
