/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from 'react-redux';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, FormControlLabel, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { registerUserAsync } from '../features/authentication/authenticationSlice';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   passwordConfirmation: '',
  //   type: '',
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  const onSubmit = (data) => {
    // event.preventDefault();
    const user = new FormData();
    user.append('user[email]', data.email);
    user.append('user[password]', data.password);
    user.append('user[password_confirmation]', data.passwordConfirmation);
    dispatch(registerUserAsync(user));
    navigates('/login');
  };

  return (
    <div>
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
          REGISTER
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
        <FormControlLabel
          control={<Checkbox {...register('rememberMe')} color="primary" />}
          label="Remember Me"
          sx={{ mt: 1, textAlign: 'left' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
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
    </div>
  );
};

export default RegistrationForm;
