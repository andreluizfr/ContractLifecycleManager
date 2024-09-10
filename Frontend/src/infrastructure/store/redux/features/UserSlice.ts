import { makePersistentStorage } from '@/factories/makePersistentStorage';

import User from '@/domain/models/User';

import { ReduxAction } from './ReduxAction';

import { createSlice } from '@reduxjs/toolkit';


export interface UserState {
    data: User | null
}

export const userInitialState: UserState = {
    data: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        saveUser(state: UserState, action: ReduxAction<User>) {
            state.data = action.payload;

            const persistentStorage = makePersistentStorage();
            persistentStorage.set("user", action.payload);
        },
        removeUser(state: UserState){
            state.data = null;

            const persistentStorage = makePersistentStorage();
            persistentStorage.remove("user");
            persistentStorage.remove("x-access-token");
        }
    }
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;