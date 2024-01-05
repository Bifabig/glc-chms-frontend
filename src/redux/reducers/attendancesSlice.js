import { createSlice } from '@reduxjs/toolkit';
import { createAttendance, getAttendances } from '../thunk';

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
      .addCase(createAttendance.fulfilled, (state, action) => {
        // console.log(action);
        // state.attendances.filter((att) => console.log(att));
        // const oldState = state.attendances;
        // console.log(action.payload.attendance.data);
        // const newAtt = action.payload.attendance;
        // state.attendances.push(newAtt);
        const data = [action.payload.attendance.data, ...state.attendances.data];
        const included = [action.payload.attendance.included,
          ...state.attendances.included];
        // state.attendances.data = Array.from(new Set(data));
        state.attendances = { data, included };
        // state.attendances.included = Array.from(new Set(included));
        state.isLoading = false;
        state.error = false;
      })
      .addCase(createAttendance.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }));
  },
});

export default attendancesSlice.reducer;
