import { createSlice } from '@reduxjs/toolkit';
import { FirestoreUser } from 'api/FirebaseTypes';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import * as UserSLiceAsyncThunk from './UserSliceAsyncThunk';

export type UserState = FirestoreUser & {
    uid: string | undefined;
    logged: boolean;
    // kitsu_mangas_list: KitsuMangaAttributes[];
};

const initialState: UserState = {
    uid: undefined,
    logged: false,
    user_mangas_list: [], //Refer to user_mangas_list in firestore
    // kitsu_mangas_list: [], // Refer to corresponding mangas in Kitsu
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            UserSLiceAsyncThunk.signInUser.fulfilled,
            (state, action) => {
                // console.log('signInUser fullfilled');
                state.logged = true;
                state.uid = action.payload.uid;
                state.email = action.payload.email;
                state.username = action.payload.user_data['username'];
                state.user_mangas_list =
                    action.payload.user_data['user_mangas_list'];
            }
        );
        builder.addCase(UserSLiceAsyncThunk.signOutUser.fulfilled, (state) => {
            // console.log('signOutUser fullfilled');
            state.uid = undefined;
            state.logged = false;
        });
        builder.addCase(
            UserSLiceAsyncThunk.signUpUser.fulfilled,
            (state, action) => {
                // console.log('signUpUser fullfilled');
                state.logged = true;
                state.uid = action.payload.uid;
                state.username = action.payload.username;
                state.user_mangas_list =
                    action.payload.user_data['user_mangas_list'];
                state.email = action.payload.email;
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.addMangaToUserMangaList.fulfilled,
            (state, action) => {
                if (
                    !getMangasIdsListFromFirestoreUsersMangasList({
                        user_mangas_list: state.user_mangas_list,
                    }).includes(action.payload.user_manga.manga_id)
                ) {
                    const new_user_manga = action.payload.user_manga;
                    state.user_mangas_list.push(new_user_manga);
                }
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.removeMangaFromUserMangaList.fulfilled,
            (state, action) => {
                const index = getMangasIdsListFromFirestoreUsersMangasList({
                    user_mangas_list: state.user_mangas_list,
                }).indexOf(action.payload.user_manga.manga_id);
                if (index > -1) {
                    state.user_mangas_list.splice(index, 1);
                }
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.updateUserMangasList.fulfilled,
            (state, action) => {
                state.user_mangas_list = action.payload.user_mangas_list;
            }
        );
    },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
