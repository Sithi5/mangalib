import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../globals/GlobalTypes';

export type UserState = {
    user_uid: string | undefined;
    mangas_list: Id[];
};

const initialState: UserState = {
    user_uid: undefined,
    mangas_list: [],
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        updateUserUid: (state, action: PayloadAction<string | undefined>) => {
            state.user_uid = action.payload;
        },
        addUserManga: (state, action: PayloadAction<string>) => {
            if (!state.mangas_list.includes(action.payload)) {
                state.mangas_list.push(action.payload);
            }
        },
        removeFromUser: (state, action: PayloadAction<string>) => {
            const index = state.mangas_list.indexOf(action.payload);
            if (index > -1) {
                state.mangas_list.splice(index, 1);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addUserManga, removeFromUser, updateUserUid } =
    UserSlice.actions;

export default UserSlice.reducer;
