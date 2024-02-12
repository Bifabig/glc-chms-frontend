import { createSlice } from '@reduxjs/toolkit';
import {
  getCurrentUser,
} from '../thunk';

const initialState = {
  currentUser: '',
  isLoading: true,
  error: false,
  errorMsg: '',
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.errorMsg = '';
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      });
  },
});

export default currentUserSlice.reducer;
