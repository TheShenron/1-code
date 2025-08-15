// features/auth/hooks/useSignUpForm.ts
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../services/login.api';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../slice';
import { Login, loginSchema } from '../schema/login.schema';

export const useLoginForm = (): UseFormReturn<Login> & {
  onSubmit: () => void;
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
      console.info('Login successfully:', data);
      dispatch(setUserDetails(data));
      // maybe redirect or show success toast here
    },
    onError: error => {
      console.error('Login failed:', error);
    },
  });

  const onSubmit = methods.handleSubmit(formData => {
    createUserMutation.mutate(formData);
  });

  return { ...methods, onSubmit };
};
