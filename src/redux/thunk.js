import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = '/api/v1';
const token = localStorage.getItem('authToken');

// Current User Api
export const getCurrentUser = createAsyncThunk('currentUser/getCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/current_user`, {
      headers: { Authorization: `${token}` },
    });
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

// Members API
export const getMembers = createAsyncThunk('members/getMembers', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/members`, {
      headers: { Authorization: `${token}` },
    });
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

export const fetchMemberDetail = createAsyncThunk('members/fetchMemberDetail', async (memberId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/members/${memberId}`, {
      headers: { Authorization: `${token}` },
    });
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
      const response = await axios.post(`${url}/members`, memberData, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add memeber');
    }
  },
);

export const deleteMember = createAsyncThunk(
  'members/deleteMember',
  async (member, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${url}/members/${member}`, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete member');
    }
  },
);

export const updateMember = createAsyncThunk(
  'members/updateMember',
  async (member, { rejectWithValue }) => {
    try {
      const { id, memberData } = member;
      const resp = await axios.put(`${url}/members/${id}`, memberData, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete member');
    }
  },
);

// Churches API
export const getChurches = createAsyncThunk('churches/getChurches', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/churches`, {
      headers: { Authorization: `${token}` },
    });
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
      const response = await axios.post(`${url}/churches`, churchData, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add church');
    }
  },
);

export const updateChurch = createAsyncThunk(
  'churches/updateChurch',
  async (church, { rejectWithValue }) => {
    try {
      const { id, churchData } = church;
      const resp = await axios.put(`${url}/churches/${id}`, churchData, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete church');
    }
  },
);

export const fetchChurchDetail = createAsyncThunk('churches/fetchChurchDetail', async (churchId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/churches/${churchId}`, {
      headers: { Authorization: `${token}` },
    });
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

export const deleteChurch = createAsyncThunk(
  'churches/deleteChurch',
  async (church, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${url}/churches/${church}`, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete church');
    }
  },
);

// Teams API

export const getTeams = createAsyncThunk('teams/getTeams', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/teams`, {
      headers: { Authorization: `${token}` },
    });
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
      const response = await axios.post(`${url}/teams`, teamData, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add team');
    }
  },
);

export const fetchTeamDetail = createAsyncThunk('teams/fetchTeamDetail', async (teamId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/teams/${teamId}`, {
      headers: { Authorization: `${token}` },
    });
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

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async (team, { rejectWithValue }) => {
    try {
      const { id, teamData } = team;
      const resp = await axios.put(`${url}/teams/${id}`, teamData, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete team');
    }
  },
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (team, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${url}/teams/${team}`, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete team');
    }
  },
);

// Programs API

export const getPrograms = createAsyncThunk('programs/getPrograms', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/programs`, {
      headers: { Authorization: `${token}` },
    });
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

export const fetchProgramDetail = createAsyncThunk('programs/fetchProgramDetail', async (programId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/programs/${programId}`, {
      headers: { Authorization: `${token}` },
    });
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
      const response = await axios.post(`${url}/programs`, programData, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add program');
    }
  },
);

export const updateProgram = createAsyncThunk(
  'programs/updateProgram',
  async (program, { rejectWithValue }) => {
    try {
      const { id, programData } = program;
      const resp = await axios.put(`${url}/programs/${id}`, programData, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete program');
    }
  },
);

export const deleteProgram = createAsyncThunk(
  'programs/deleteProgram',
  async (program, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${url}/programs/${program}`, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete program');
    }
  },
);
// Attendaces API

export const getAttendances = createAsyncThunk('attendances/getAttendaces', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}/attendances`, {
      headers: { Authorization: `${token}` },
    });
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
      const response = await axios.post(`${url}/attendances`, attendanceData, {
        headers: { Authorization: `${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue('Unable to add attendance');
    }
  },
);

export const deleteAttendance = createAsyncThunk(
  'attendances/deleteAttendance',
  async (attendance, { rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${url}/attendances/${attendance}`, {
        headers: { Authorization: `${token}` },
      });
      return resp.data;
    } catch (error) {
      return rejectWithValue('Unable to delete attendance');
    }
  },
);
