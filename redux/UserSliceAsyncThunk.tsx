import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    firestoreAddMangaToUserMangasList,
    firestoreGetUserData,
    firestoreRemoveMangaFromUserMangasList,
    firestoreUpdateUserMangasList,
} from 'api/FirebaseApi';
import { FirestoreUser, FirestoreUserManga } from 'api/FirebaseTypes';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';

const auth = getAuth();
const firestore = getFirestore();

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
        const user_data: FirestoreUser = {
            email: email,
            username: username,
            user_mangas_list: [],
        };
        await setDoc(doc(collection(firestore, 'users'), uid), user_data);
        const snapshot = await firestoreGetUserData({ uid: uid });

        return { email, uid, username, user_data };
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