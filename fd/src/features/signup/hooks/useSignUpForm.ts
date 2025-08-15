// features/auth/hooks/useSignUpForm.ts
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '@/app/types/roles';
import { createUser } from '../services/signup.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SignupForm, signupFormSchema } from '../schema/signup.schema';

export const useSignUpForm = (): UseFormReturn<SignupForm> & {
  onSubmit: () => void;
} => {
  const navigate = useNavigate();

  const methods = useForm<SignupForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: Role.GUEST,
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: data => {
      console.info('User created successfully:', data);
      navigate('/');
      // maybe redirect or show success toast here
    },
    onError: error => {
      console.error('User creation failed:', error);
    },
  });

  const onSubmit = methods.handleSubmit(formData => {
    createUserMutation.mutate(formData);
  });

  return { ...methods, onSubmit };
};
