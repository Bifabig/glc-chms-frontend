import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1';

// Members API
export const getMembers = createAsyncThunk('members/getMembers', async (thunkAPI) => {
  try {
    const response = await axios.get(`${url}/members`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createMember = createAsyncThunk(
  'members/createMember',
  async (memberData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/members`, memberData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add memeber');
    }
  },
);

// Churches API
export const getChurches = createAsyncThunk('churches/getChurches', async (thunkAPI) => {
  try {
    const response = await axios.get(`${url}/churches`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createChurch = createAsyncThunk(
  'churches/createChurch',
  async (churchData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/churches`, churchData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add church');
    }
  },
);

// Teams API

export const getTeams = createAsyncThunk('teams/getTeams', async (thunkAPI) => {
  try {
    const response = await axios.get(`${url}/teams`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/teams`, teamData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add team');
    }
  },
);
