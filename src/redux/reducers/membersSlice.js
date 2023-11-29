import { createSlice } from '@reduxjs/toolkit';
import { createMember, fetchMemberDetail, getMembers } from '../thunk';

const initialState = {
  members: '',
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
        // console.log(data, memberChurch, memberTeams);
        state.memberDetail = { data, memberChurch, memberTeams };
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchMemberDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMsg = action.payload;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.members.data.push(action.payload.member.data);
        state.members.included.push(action.payload.included);
        state.isLoading = false;
      })
      .addCase(createMember.rejected, (state, { error }) => ({
        ...state,
        isLoading: false,
        error: error.stack,
      }));
  },
});

export default membersSlice.reducer;
