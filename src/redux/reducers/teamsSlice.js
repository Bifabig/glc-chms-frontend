import { createSlice } from '@reduxjs/toolkit';
import { createTeam, deleteTeam, getTeams } from '../thunk';

const initialState = {
  teams: [],
  isLoading: true,
  error: false,
  errorMsg: '',
};

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.teams = action.payload;
      })
      .addCase(getTeams.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.teams = [action.payload.team, ...state.teams];
        state.isLoading = false;
      })
      .addCase(createTeam.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(deleteTeam.fulfilled, (state, { payload }) => {
        state.teams = payload;
        state.isLoading = false;
      })
      .addCase(deleteTeam.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default teamsSlice.reducer;
