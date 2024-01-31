import { createSlice } from '@reduxjs/toolkit';
import {
  createChurch, deleteChurch, fetchChurchDetail, getChurches, updateChurch,
} from '../thunk';

const initialState = {
  churches: [],
  churchDetail: '',
  isLoading: true,
  error: false,
  errorMsg: '',
};

const churchesSlice = createSlice({
  name: 'churches',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChurches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChurches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.churches = action.payload;
      })
      .addCase(getChurches.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createChurch.fulfilled, (state, action) => {
        state.churches = [action.payload.church, ...state.churches];
        state.isLoading = false;
      })
      .addCase(createChurch.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(updateChurch.fulfilled, (state, { payload }) => {
        state.churchDetail = payload;
        state.isLoading = false;
      })
      .addCase(updateChurch.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(fetchChurchDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChurchDetail.fulfilled, (state, { payload }) => {
        state.churchDetail = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchChurchDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(deleteChurch.fulfilled, (state, { payload }) => {
        state.churches = payload;
        state.isLoading = false;
      })
      .addCase(deleteChurch.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default churchesSlice.reducer;
