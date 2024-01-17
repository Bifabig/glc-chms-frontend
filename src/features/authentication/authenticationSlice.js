// authenticationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi, confirmAccountApi, loginUserApi, logoutUserApi,
} from './authenticationApi';

const initialState = {
  error: null,
  status: 'idle',
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
  'authentication/userSession',
  async (user) => {
    const response = await loginUserApi(user);
    const authToken = response.headers.authorization;
    localStorage.setItem('authToken', authToken);
    return response;
  },
);

export const logoutUserAsync = createAsyncThunk(
  'authentication/logout',
  async () => {
    const authToken = localStorage.getItem('authToken');
    const response = await logoutUserApi(authToken);
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
      });
  },
});

export default authenticationSlice.reducer;
