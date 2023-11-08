import { createSlice } from '@reduxjs/toolkit';
import getMembers, { createMember } from '../thunk';

const initialState = {
  members: '',
  isLoading: true,
  error: false,
  errorMsg: '',
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload.error;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.members = [action.payload.member, ...state.members];
        state.isLoading = false;
      })
      .addCase(createMember.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }));
  },
});

export default membersSlice.reducer;
