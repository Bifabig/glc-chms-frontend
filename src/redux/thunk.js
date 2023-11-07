import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS';
const url = '/api/v1/members';

const getMembers = createAsyncThunk('members/getMembers', async (thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createMember = createAsyncThunk(
  'members/createMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, memberData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add memeber');
    }
  },
);

export default getMembers;
