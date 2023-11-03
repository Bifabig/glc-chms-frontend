import { configureStore } from '@reduxjs/toolkit';
import membersReducer from './reducers/membersSlice';

const store = configureStore({
  reducer: {
    members: membersReducer,
  },
});

export default store;
