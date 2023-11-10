import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1';

// Members API
export const getMembers = createAsyncThunk('members/getMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/members`);
    return response.data;
  } catch (error) {
    const message = (error.response
      && error.response.data
      && error.response.data.message)
    || error.message
    || error.toString();
    return rejectWithValue(message);
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
export const getChurches = createAsyncThunk('churches/getChurches', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/churches`);
    return response.data;
  } catch (error) {
    const message = (error.response
      && error.response.data
      && error.response.data.message)
    || error.message
    || error.toString();
    return rejectWithValue(message);
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

export const getTeams = createAsyncThunk('teams/getTeams', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/teams`);
    return response.data;
  } catch (error) {
    const message = (error.response
      && error.response.data
      && error.response.data.message)
    || error.message
    || error.toString();
    return rejectWithValue(message);
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

// Programs API

export const getPrograms = createAsyncThunk('programs/getPrograms', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/programs`);
    return response.data;
  } catch (error) {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    return rejectWithValue(message);
  }
});

export const createProgram = createAsyncThunk(
  'programs/createProgram',
  async (programData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/programs`, programData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add program');
    }
  },
);

// Attendaces API

export const getAttendances = createAsyncThunk('attendances/getAttendaces', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/attendances`);
    return response.data;
  } catch (error) {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    return rejectWithValue(message);
  }
});

export const createAttendance = createAsyncThunk(
  'attendances/createAttendance',
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/attendances`, attendanceData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add attendance');
    }
  },
);
