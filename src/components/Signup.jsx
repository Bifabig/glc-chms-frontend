/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from 'react-redux';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, TextField, useTheme,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { registerUserAsync } from '../features/authentication/authenticationSlice';
import { tokens } from '../theme';
import Header from './Header';

const RegistrationForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const user = new FormData();
    user.append('user[email]', data.email);
    user.append('user[password]', data.password);
    user.append('user[password_confirmation]', data.passwordConfirmation);
    dispatch(registerUserAsync(user));
    navigates('/login');
  };

  return (
    <Box p={2}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Header title="Register User" subtitle="Register a new user" />
        <TextField
          fullWidth
          label="email"
          type="email"
          {...register('email', {
            required: 'email is required',
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          margin="normal"
          sx={{
            '& label.Mui-focused': {
              color: colors.orangeAccent[500],
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: colors.orangeAccent[500],
              },
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          margin="normal"
          sx={{
            '& label.Mui-focused': {
              color: colors.orangeAccent[500],
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: colors.orangeAccent[500],
              },
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="password confirmation"
          {...register('passwordConfirmation', {
            required: 'password confirmation is required',
            minLength: {
              value: 6,
              message: 'password confirmation must be at least 6 characters',
            },
          })}
          error={Boolean(errors.passwordConfirmation)}
          helperText={errors.passwordConfirmation?.message}
          margin="normal"
          sx={{
            '& label.Mui-focused': {
              color: colors.orangeAccent[500],
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: colors.orangeAccent[500],
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ background: colors.greenAccent[700], ':hover': { background: colors.greenAccent[600] }, mt: 2 }}
        >
          Register
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Box mt={1}>
            <Button onClick={() => navigates('/login')} variant="body2">
              Have an account? Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
