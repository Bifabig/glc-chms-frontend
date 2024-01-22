/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { resetPasswordAsync } from '../features/authentication/authenticationSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();

  const onSubmit = (data) => {
    const searchParams = new URLSearchParams(location.search);
    const resetPasswordToken = searchParams.get('reset_password_token');
    // event.preventDefault();
    const password = new FormData();
    // user.append('user[email]', data.email);
    password.append('password', data.password);
    password.append('password_confirmation', data.passwordConfirmation);
    // user.append('user[password_confirmation]', data.passwordConfirmation);
    dispatch(resetPasswordAsync({ password, resetPasswordToken }));
    // navigates('/login');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >

      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        New Password
      </Typography>
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
        sx={{ mt: 2 }}
      />
      <TextField
        fullWidth
        type="password"
        label="passwordConfirmation"
        {...register('passwordConfirmation', {
          required: 'passwordConfirmation is required',
          minLength: {
            value: 6,
            message: 'passwordConfirmation must be at least 6 characters',
          },
        })}
        error={Boolean(errors.passwordConfirmation)}
        helperText={errors.passwordConfirmation?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Box mt={1}>
          <Button onClick={() => navigates('/login')} variant="body2">
            Have an account? Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ResetPassword;
