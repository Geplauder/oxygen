import { configureStore } from '@reduxjs/toolkit'
import authSlice from './reducers/auth';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

store.subscribe(() => {
  localStorage.setItem('geplauderState', JSON.stringify(store.getState()));
});

export default store;
