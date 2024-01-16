// authenticationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi, confirmAccountApi, loginUserApi, logoutUserApi,
} from './authenticationApi';

const initialState = {
  error: null,
  status: 'idle',
  authToken: null,
};

export const registerUserAsync = createAsyncThunk(
  'authentication/userRegistration',
  async (data) => {
    const response = await registerUserApi(data);
    const authToken = response.headers.authorization;
    window.localStorage.setItem('authToken', authToken);
    return response.data;
  },
);

export const loginUserAsync = createAsyncThunk(
  'authentication/userSession',
  async (data) => {
    const response = await loginUserApi(data);
    const authToken = response.headers.authorization;
    window.localStorage.setItem('authToken', authToken);
    // console.log(response);
    return response;
  },
);

export const logoutUserAsync = createAsyncThunk(
  'authentication/logout',
  async () => {
    const response = await logoutUserApi();
    // const authToken = response.headers.authorization;
    // window.localStorage.setItem('authToken', authToken);
    // console.log(response);
    return response.data;
  },
);

export const confirmAccountAsync = createAsyncThunk(
  'authentication/confirmAccount',
  async (token) => {
    const response = confirmAccountApi(token);
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
      })
      .addCase(loginUserAsync.fulfilled, (state, response) => {
        state.status = 'success';
        console.log(response);
        state.authToken = response.payload.headers.authorization;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.status = 'success';
        // console.log(response);
        state.authToken = null;
      })
      .addCase(logoutUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(confirmAccountAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmAccountAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(confirmAccountAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export default authenticationSlice.reducer;
