// features/auth/hooks/useSignUpForm.ts
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login.api';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../slice';
import { Login, loginSchema } from '../schema/login.schema';
import { AxiosError } from 'axios';

export const useLoginForm = (): UseFormReturn<Login> & {
  onSubmit: () => void;
  isPending: boolean;
} => {
  const dispatch = useDispatch();

  const methods = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      const { data: userData } = data;
      dispatch(setUserDetails(userData));
    },
    onError: error => {
      console.error('Login failed:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      const message = axiosError.response?.data?.message || 'Login failed';
      methods.setError('root', {
        type: 'manual',
        message,
      });
    },
  });

  const onSubmit = methods.handleSubmit(formData => {
    createUserMutation.mutate(formData);
  });

  return { ...methods, onSubmit, isPending: createUserMutation.isPending };
};
