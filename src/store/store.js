
import { configureStore } from '@reduxjs/toolkit';
import officeReducer from './slice';

export const store = configureStore({
  reducer: {
    office: officeReducer,
  },
});

export default store;

