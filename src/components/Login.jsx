/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Checkbox, FormControlLabel, TextField, Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginUserAsync, logoutUserAsync } from '../features/authentication/authenticationSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigates = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const auth = localStorage.getItem('authToken');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const user = new FormData();
    user.append('user[email]', data.email);
    user.append('user[password]', data.password);
    dispatch(loginUserAsync(user));
    navigates('/');
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUserAsync());
  };

  if (error) {
    return (
      <span>
        Something Went Wrong...
        <br />
        <br />
        {error.message}
        <br />
        Wrong Email / Password
        <br />
        If this is your first time logging in please make sure to confirm email first.
      </span>
    );
  }

  return isLoading ? <h2>Loading...</h2> : (
    <div>
      {auth && auth.length > 0
        ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            size="small"
          >
            {user.email}
            Logout
          </Button>
        )
        : (
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
              Login Form
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
            <FormControlLabel
              control={<Checkbox {...register('rememberMe')} color="primary" />}
              label="Remember Me"
              sx={{ mt: 1, textAlign: 'left' }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={() => navigates('/')} variant="body2">
                Forgot Password?
              </Button>
              <Box mt={1}>
                <Button onClick={() => navigates('/signup')} variant="body2">
                  Don&apos;t have an account? Sign Up
                </Button>
              </Box>
            </Box>
          </Box>
        )}
    </div>
  );
};

export default Login;
