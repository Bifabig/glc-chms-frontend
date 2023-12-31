import { createSlice } from '@reduxjs/toolkit';
import { createChurch, getChurches } from '../thunk';

const initialState = {
  churches: '',
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
      }));
  },
});

export default churchesSlice.reducer;
