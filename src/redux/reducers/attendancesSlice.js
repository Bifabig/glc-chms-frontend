import { createSlice } from '@reduxjs/toolkit';
import { createAttendance, deleteAttendance, getAttendances } from '../thunk';

const initialState = {
  attendances: [],
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
        state.error = false;
        // console.log(action.payload);
        state.attendances = action.payload.attendance;
      })
      .addCase(getAttendances.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createAttendance.fulfilled, (state, { payload }) => {
        // state.attendances.data = [action.payload.attendance.data, ...state.attendances.data];
        // state.attendances.included = [action.payload.attendance.included,
        //   ...state.attendances.included];
        state.attendances.data = [...state.attendances.data, payload.attendance.data];
        state.isLoading = false;
        state.error = false;
      })
      .addCase(createAttendance.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(deleteAttendance.fulfilled, (state, { payload }) => {
        state.attendances = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(deleteAttendance.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: true,
        errorMsg: `something went wrong ${payload}`,
      }));
  },
});

export default attendancesSlice.reducer;
