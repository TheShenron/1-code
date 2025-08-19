// features/auth/components/SignUpForm.tsx
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { Role } from '@/app/types/roles';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSignUpForm } from '../hooks/useSignUpForm';

const roleOptions = [Role.ADMIN, Role.GUEST, Role.USER];

export const SignUpForm: React.FC = () => {
  const form = useSignUpForm();
  const {
    register,
    onSubmit,
    isPending,
    formState: { errors },
  } = form;

  const navigate = useNavigate();

  const navSignup = (): void => {
    navigate('/');
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
      <Typography variant="h5">Sign Up</Typography>

      <TextField
        placeholder="Name"
        autoComplete="name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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

      <TextField
        placeholder="Role"
        select
        autoComplete="off"
        defaultValue={Role.GUEST}
        {...register('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
      >
        {roleOptions.map(role => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" type="submit" disabled={isPending}>
        Submit
      </Button>
      <Button variant="contained" onClick={navSignup} disabled={isPending}>
        Login
      </Button>
    </Box>
  );
};
