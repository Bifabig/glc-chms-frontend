/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box, Button, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPasswordAsync } from '../features/authentication/authenticationSlice';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigates = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // dispatch(confirmAccountAsync(confirmationToken));

    const user = new FormData();
    user.append('email', data.email);
    // user.append('user[password]', data.password);
    dispatch(forgotPasswordAsync(user));
    // navigates('/');
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
        Password Reset
      </Typography>
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
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Reset
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

export default ForgotPassword;
