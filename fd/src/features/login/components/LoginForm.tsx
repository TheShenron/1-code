// features/auth/components/SignUpForm.tsx
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';

export const LoginForm: React.FC = () => {
  const form = useLoginForm();
  const {
    register,
    onSubmit,
    isPending,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const navSignup = (): void => {
    navigate('/signup');
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        gap: 2,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        mx: 'auto',
        mt: 10,
      }}
    >
      <Typography variant="h5">Login Up</Typography>

      {errors.root && <div>{errors.root.message}</div>}

      <TextField
        placeholder="Email"
        autoComplete="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        placeholder="Password"
        type="password"
        autoComplete="off"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button variant="contained" type="submit" disabled={isPending}>
        Login
      </Button>
      <Button variant="contained" onClick={navSignup} disabled={isPending}>
        Signup
      </Button>
    </Box>
  );
};
