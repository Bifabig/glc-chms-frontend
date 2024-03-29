import { createSlice } from '@reduxjs/toolkit';
import {
  createMember, deleteMember, fetchMemberDetail, getMembers, updateMember,
} from '../thunk';

const initialState = {
  members: [],
  memberDetail: '',
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
        state.error = false;
        state.errorMsg = '';
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(fetchMemberDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMemberDetail.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const memberChurch = payload.included.filter((church) => ((church.type === 'church')));
        const memberTeams = payload.included.filter((team) => ((team.type === 'team')));
        state.memberDetail = { ...data, memberChurch, memberTeams };
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchMemberDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.members.data = [action.payload.member.data, ...state.members.data];
        state.members.included = [action.payload.member.included, ...state.members.included];
        state.isLoading = false;
      })
      .addCase(createMember.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(updateMember.fulfilled, (state, { payload }) => {
        const memberChurch = payload.member.included.filter((church) => ((church.type === 'church')));
        const memberTeams = payload.member.included.filter((team) => ((team.type === 'team')));
        state.memberDetail = { ...payload.member.data, memberChurch, memberTeams };
        state.isLoading = false;
      })
      .addCase(updateMember.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }))
      .addCase(deleteMember.fulfilled, (state, { payload }) => {
        state.members = payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(deleteMember.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: true,
        errorMsg: `something went wrong ${payload}`,
      }));
  },
});

export default membersSlice.reducer;
