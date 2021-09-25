import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';
import serversReducer from '../features/servers/serversSlice';
import channelsReducer from '../features/channels/channelsSlice';
import { backendApi } from '../services/backend';

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    login: loginReducer,
    user: userReducer,
    servers: serversReducer,
    channels: channelsReducer,
  },
  middleware: (gDM) => gDM().concat(backendApi.middleware),
});

store.subscribe(() => {
  localStorage.setItem('geplauderState', JSON.stringify(store.getState().login));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
