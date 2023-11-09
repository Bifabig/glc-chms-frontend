import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './reducers/membersSlice';
import churchesReducer from './reducers/churchesSlice';
import teamsReducer from './reducers/teamsSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
    churches: churchesReducer,
    teams: teamsReducer,
  },
});

export default store;
