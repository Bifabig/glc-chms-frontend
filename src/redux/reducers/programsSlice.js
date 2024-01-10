import { createSlice } from '@reduxjs/toolkit';
import {
  createProgram, getPrograms, deleteProgram, fetchProgramDetail, updateProgram,
} from '../thunk';

const initialState = {
  programs: [],
  programDetail: '',
  isLoading: true,
  error: false,
  errorMsg: '',
};
const programsSlice = createSlice({
  name: 'programs',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPrograms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPrograms.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.errorMsg = '';
        state.programs = payload;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(fetchProgramDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProgramDetail.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const programChurch = payload.included.filter((church) => ((church.type === 'church')));
        const programTeams = payload.included.filter((team) => ((team.type === 'team')));
        const programAttendance = payload.included.filter((attendance) => ((attendance.type === 'attendance')));
        state.programDetail = {
          ...data, programChurch, programTeams, programAttendance,
        };
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchProgramDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(updateProgram.fulfilled, (state, { payload }) => {
        const programChurch = payload.program.included.filter((church) => ((church.type === 'church')));
        const programTeams = payload.program.included.filter((team) => ((team.type === 'team')));
        state.programDetail = { ...payload.program.data, programChurch, programTeams };
        state.isLoading = false;
      })
      .addCase(updateProgram.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(createProgram.fulfilled, (state, { payload }) => {
        state.programs.data = [
          payload.program.data,
          ...state.programs.data,
        ];
        state.programs.included = [
          payload.included,
          ...state.programs.included,
        ];
        state.isLoading = false;
        state.error = false;
      })
      .addCase(createProgram.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(deleteProgram.fulfilled, (state, { payload }) => {
        state.programs = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(deleteProgram.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: true,
        errorMsg: `something went wrong ${payload}`,
      }));
  },
});

export default programsSlice.reducer;
