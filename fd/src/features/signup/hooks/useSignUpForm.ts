// features/auth/hooks/useSignUpForm.ts
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Role } from '@/app/types/roles';
import { createUser } from '../services/signup.api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SignupForm, signupFormSchema } from '../schema/signup.schema';
import { toast } from 'react-toastify';

export const useSignUpForm = (): UseFormReturn<SignupForm> & {
  onSubmit: () => void;
  isPending: boolean;
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
      const { message } = data;
      toast.success(message, {
        onClose: () => {
          navigate('/');
        },
      });
    },
    onError: error => {
      console.error('User creation failed:', error);
    },
  });

  const onSubmit = methods.handleSubmit(formData => {
    createUserMutation.mutate(formData);
  });

  return { ...methods, onSubmit, isPending: createUserMutation.isPending };
};
