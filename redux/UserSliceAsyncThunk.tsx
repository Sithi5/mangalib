import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    firestoreAddAnimeToUserAnimesList,
    firestoreAddMangaToUserMangasList,
    firestoreCreateUserData,
    firestoreGetUserData,
    firestoreRemoveAnimeFromUserAnimesList,
    firestoreRemoveMangaFromUserMangasList,
    firestoreUpdateUserAnimesList,
    firestoreUpdateUserMangasList,
} from 'api/FirebaseApi';
import {
    FirestoreUser,
    FirestoreUserAnime,
    FirestoreUserManga,
} from 'api/FirebaseTypes';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

const auth = getAuth();

export const signInUser = createAsyncThunk(
    'user/signInUser',
    async (args: { email: string; password: string }) => {
        const { email, password } = args;
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = response.user.uid;
        const snapshot = await firestoreGetUserData({ uid: uid });
        let user_data: FirestoreUser;
        if (snapshot.exists()) {
            user_data = snapshot.data() as FirestoreUser;
        } else {
            throw "User data doesn't exist.";
        }
        return { email, uid, user_data };
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUpUser',
    async (args: { email: string; password: string; username: string }) => {
        const { email, password, username } = args;
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = response.user.uid;

        await firestoreCreateUserData({
            uid: uid,
            email: email,
            username: username,
        });
        const snapshot = await firestoreGetUserData({ uid: uid });
        if (!snapshot.exists()) {
            throw 'Error when creating user data.';
        }
        const user_data = snapshot.data() as FirestoreUser;
        return { email, uid, username, user_data };
    }
);

export const getUserData = createAsyncThunk(
    'user/getUserData',
    async (args: { user_uid: string }) => {
        const { user_uid } = args;
        const snapshot = await firestoreGetUserData({ uid: user_uid });
        let user_data: FirestoreUser;
        if (snapshot.exists()) {
            user_data = snapshot.data() as FirestoreUser;
        } else {
            throw "User data doesn't exist.";
        }
        return { user_data };
    }
);

export const signOutUser = createAsyncThunk('user/signOutUser', async () => {
    await signOut(auth);
});

export const addMangaToUserMangaList = createAsyncThunk(
    'user/addMangaToUserMangaList',
    async (args: { uid: string; user_manga: FirestoreUserManga }) => {
        const { user_manga, uid } = args;
        const response = await firestoreAddMangaToUserMangasList({
            user_manga: user_manga,
            uid: uid,
        });
        return { user_manga };
    }
);

export const removeMangaFromUserMangaList = createAsyncThunk(
    'user/removeMangaFromUserMangaList',
    async (args: { uid: string; user_manga: FirestoreUserManga }) => {
        const { user_manga, uid } = args;
        const response = await firestoreRemoveMangaFromUserMangasList({
            user_manga: user_manga,
            uid: uid,
        });
        return { user_manga };
    }
);

export const updateUserMangasList = createAsyncThunk(
    'user/updateUserMangasList',
    async (args: { uid: string; user_mangas_list: FirestoreUserManga[] }) => {
        const { user_mangas_list, uid } = args;
        const response = await firestoreUpdateUserMangasList({
            user_mangas_list: user_mangas_list,
            uid: uid,
        });
        return { user_mangas_list };
    }
);

export const addAnimeToUserAnimeList = createAsyncThunk(
    'user/addAnimeToUserAnimeList',
    async (args: { uid: string; user_anime: FirestoreUserAnime }) => {
        const { user_anime, uid } = args;
        const response = await firestoreAddAnimeToUserAnimesList({
            user_anime: user_anime,
            uid: uid,
        });
        return { user_anime };
    }
);

export const removeAnimeFromUserAnimeList = createAsyncThunk(
    'user/removeAnimeFromUserAnimeList',
    async (args: { uid: string; user_anime: FirestoreUserAnime }) => {
        const { user_anime, uid } = args;
        const response = await firestoreRemoveAnimeFromUserAnimesList({
            user_anime: user_anime,
            uid: uid,
        });
        return { user_anime };
    }
);

export const updateUserAnimesList = createAsyncThunk(
    'user/updateUserAnimesList',
    async (args: { uid: string; user_animes_list: FirestoreUserAnime[] }) => {
        const { user_animes_list, uid } = args;
        const response = await firestoreUpdateUserAnimesList({
            user_animes_list: user_animes_list,
            uid: uid,
        });
        return { user_animes_list };
    }
);
