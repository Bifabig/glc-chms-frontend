import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import membersReducer from './reducers/membersSlice';
import churchesReducer from './reducers/churchesSlice';
import teamsReducer from './reducers/teamsSlice';
import programsReducer from './reducers/programsSlice';
import attendanceReducer from './reducers/attendancesSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  members: membersReducer,
  churches: churchesReducer,
  teams: teamsReducer,
  programs: programsReducer,
  attendances: attendanceReducer,
  auth: authenticationReducer,
});

persistConfig.storage.removeItem('persist:root');

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: ((getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })),
});

export default store;
