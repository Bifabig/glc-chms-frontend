// authenticationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  confirmAccountApi,
  loginUserApi,
  logoutUserApi,
  resetPasswordApi,
  forgotPasswordApi,
} from './authenticationApi';

const initialState = {
  error: null,
  status: 'idle',
  user: {},
  isLoading: false,
  authToken: null,
};

export const registerUserAsync = createAsyncThunk(
  'authentication/userRegistration',
  async (user) => {
    const response = await registerUserApi(user);
    return response.data;
  },
);

export const loginUserAsync = createAsyncThunk(
  'authentication/login',
  async (user) => {
    const response = await loginUserApi(user);
    const authToken = response.headers.authorization;
    localStorage.setItem('authToken', authToken);
    // console.log(response);
    return response;
  },
);

export const logoutUserAsync = createAsyncThunk(
  'authentication/logout',
  async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await logoutUserApi(authToken);
    // console.log(response);
    return response.data;
  },
);

export const confirmAccountAsync = createAsyncThunk(
  'authentication/confirmAccount',
  async (token) => {
    const response = await confirmAccountApi(token);
    return response;
  },
);

export const forgotPasswordAsync = createAsyncThunk(
  'authentication/forgotPassword',
  async (user) => {
    const response = await forgotPasswordApi(user);
    // const authToken = response.headers.authorization;
    // localStorage.setItem('authToken', authToken);
    // console.log(response);
    return response;
  },
);

export const resetPasswordAsync = createAsyncThunk(
  'authentication/resetPassword',
  async ({ password, resetPasswordToken }) => {
    const response = await resetPasswordApi({ password, resetPasswordToken });
    return response.data;
  },
);

// export const getCurrentUserAsync = createAsyncThunk(
//   'authentication/currentUser',
//   async () => {
//     const response = await getCurrentUser();
//     console.log(response);
//     return response;
//   },
// );

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.status = 'success';
        state.isLoading = false;
        // console.log(action);
        // state.user = payload.data.user;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.status = 'success';
        state.isLoading = false;
        localStorage.removeItem('authToken');
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.isLoading = false;
        state.status = 'failed';
      })
      .addCase(confirmAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmAccountAsync.fulfilled, (state, action) => {
        state.status = action.payload;
        state.isLoading = false;
      })
      .addCase(confirmAccountAsync.rejected, (state, action) => {
        state.status = action.error;
        state.isLoading = false;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.status = 'success';
        state.isLoading = false;
        // console.log(action);
        // state.user = payload.data.user;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = 'success';
        state.isLoading = false;
        // console.log(payload);
        // state.user = payload.data.user;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default authenticationSlice.reducer;
