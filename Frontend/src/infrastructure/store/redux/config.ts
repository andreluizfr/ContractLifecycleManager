import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/UserSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
    }
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;