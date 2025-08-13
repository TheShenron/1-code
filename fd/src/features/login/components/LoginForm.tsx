// features/auth/components/SignUpForm.tsx
import {
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { LoginFormValues } from '../hooks/useLoginForm';
import { UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface Props {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: () => void;
}

export const LoginForm: React.FC<Props> = ({ form, onSubmit }) => {
  const { register, formState: { errors } } = form;
  const navigate = useNavigate();

  const navSignup = (): void => {
    navigate('/signup');
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ gap: 2, display: 'flex', flexDirection: 'column', maxWidth: 500, mx: 'auto', mt: 10 }}>
      <Typography variant="h5">Login Up</Typography>


      <TextField
        placeholder='Email'
        autoComplete="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        placeholder='Password'
        type="password"
        autoComplete="off"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button variant="contained" type="submit">Login</Button>
      <Button variant="contained" onClick={navSignup}>Signup</Button>

    </Box>
  );
};
