import { createSlice } from '@reduxjs/toolkit';
import { createProgram, getPrograms } from '../thunk';

const initialState = {
  programs: [],
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
      .addCase(getPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.errorMsg = '';
        state.programs = action.payload;
      })
      .addCase(getPrograms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.programs.data = [
          action.payload.program.data,
          ...state.programs.data,
        ];
        state.programs.included = [
          action.payload.included,
          ...state.programs.included,
        ];
        state.isLoading = false;
      })
      .addCase(createProgram.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }));
  },
});

export default programsSlice.reducer;
