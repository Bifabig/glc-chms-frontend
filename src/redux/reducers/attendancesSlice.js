import { createSlice } from '@reduxjs/toolkit';
import { createAttendance, getAttendances } from '../thunk';

const initialState = {
  attendances: '',
  isLoading: true,
  error: false,
  errorMsg: '',
};

const attendancesSlice = createSlice({
  name: 'attendances',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAttendances.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAttendances.fulfilled, (state, action) => {
        state.isLoading = false;
        state.churches = action.payload;
      })
      .addCase(getAttendances.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.attendances = [action.payload.attendance, ...state.attendances];
        state.isLoading = false;
      })
      .addCase(createAttendance.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }));
  },
});

export default attendancesSlice.reducer;
