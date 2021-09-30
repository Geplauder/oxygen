import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import usersReducer from '../features/users/usersSlice';
import serversReducer from '../features/servers/serversSlice';
import channelsReducer from '../features/channels/channelsSlice';
import messagesReducer from '../features/messages/messagesSlice';
import { websocketMiddleware } from '../middlewares/websocket';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  servers: serversReducer,
  channels: channelsReducer,
  messages: messagesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware),
});

store.subscribe(() => {
  localStorage.setItem('geplauderState', JSON.stringify(store.getState().auth));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
