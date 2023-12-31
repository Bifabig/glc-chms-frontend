import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './reducers/membersSlice';
import churchesReducer from './reducers/churchesSlice';
import teamsReducer from './reducers/teamsSlice';
import programsReducer from './reducers/programsSlice';
import attendanceReducer from './reducers/attendancesSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
    churches: churchesReducer,
    teams: teamsReducer,
    programs: programsReducer,
    attendances: attendanceReducer,
  },
});

export default store;
