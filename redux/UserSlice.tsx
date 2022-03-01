import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirestoreUser } from 'api/FirebaseTypes';
import {
    getAnimesIdsListFromFirestoreUsersAnimesList,
    getMangasIdsListFromFirestoreUsersMangasList,
} from 'utils/firebase';
import * as UserSLiceAsyncThunk from './UserSliceAsyncThunk';

export type UserState = FirestoreUser & {
    uid: string | undefined;
    logged: boolean;
    profil_image_url?: string;
};

const initialState: UserState = {
    uid: undefined,
    logged: false,
    user_mangas_list: [], //Refer to user_mangas_list in firestore
    user_animes_list: [], //Refer to user_animes_list in firestore
    profil_image_url:
        'https://img2.freepng.fr/20180714/hxu/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f52aa71.9002514115315676633386.jpg',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLogged(state, action: PayloadAction<boolean>) {
            state.logged = action.payload;
        },
        setUserUid(state, action: PayloadAction<string>) {
            state.uid = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            UserSLiceAsyncThunk.signInUser.fulfilled,
            (state, action) => {
                state.logged = true;
                state.uid = action.payload.uid;
                state.email = action.payload.email;
                state.username = action.payload.user_data['username'];
                state.user_mangas_list =
                    action.payload.user_data['user_mangas_list'];
            }
        );
        builder.addCase(UserSLiceAsyncThunk.signOutUser.fulfilled, (state) => {
            state.uid = undefined;
            state.logged = false;
        });
        builder.addCase(
            UserSLiceAsyncThunk.signUpUser.fulfilled,
            (state, action) => {
                state.logged = true;
                state.uid = action.payload.uid;
                state.username = action.payload.username;
                state.user_mangas_list =
                    action.payload.user_data['user_mangas_list'];
                state.email = action.payload.email;
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.getUserData.fulfilled,
            (state, action) => {
                const { user_data } = action.payload;
                state.username = user_data.username;
                state.user_mangas_list = user_data['user_mangas_list'];
                state.user_animes_list = user_data['user_animes_list'];
                state.email = user_data.email;
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
        builder.addCase(
            UserSLiceAsyncThunk.addAnimeToUserAnimeList.fulfilled,
            (state, action) => {
                if (
                    !getAnimesIdsListFromFirestoreUsersAnimesList({
                        user_animes_list: state.user_animes_list,
                    }).includes(action.payload.user_anime.anime_id)
                ) {
                    const new_user_anime = action.payload.user_anime;
                    state.user_animes_list.push(new_user_anime);
                }
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.removeAnimeFromUserAnimeList.fulfilled,
            (state, action) => {
                const index = getAnimesIdsListFromFirestoreUsersAnimesList({
                    user_animes_list: state.user_animes_list,
                }).indexOf(action.payload.user_anime.anime_id);
                if (index > -1) {
                    state.user_animes_list.splice(index, 1);
                }
            }
        );
        builder.addCase(
            UserSLiceAsyncThunk.updateUserAnimesList.fulfilled,
            (state, action) => {
                state.user_animes_list = action.payload.user_animes_list;
            }
        );
    },
});

// Action creators are generated for each case reducer function
export const { setUserLogged, setUserUid } = userSlice.actions;

export default userSlice.reducer;
