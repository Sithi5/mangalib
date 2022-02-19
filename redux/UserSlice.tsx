import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    firestoreAddMangaToUserMangasList,
    firestoreGetUserData,
    firestoreRemoveMangaFromUserMangasList,
} from 'api/FireBase';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { Id } from '../globals/GlobalTypes';

const auth = getAuth();
const firestore = getFirestore();

export const signInUser = createAsyncThunk(
    'user/signInUser',
    async (args: { email: string; password: string }) => {
        const email = args.email;
        const password = args.password;
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = response.user.uid;
        const snapshot = await firestoreGetUserData({ uid: uid });
        let user_data: UserData;
        if (snapshot.exists()) {
            user_data = snapshot.data() as UserData;
        } else {
            throw "User data doesn't exist.";
        }
        return { email, uid, user_data };
    }
);

export const addMangaToUserLibrary = createAsyncThunk(
    'user/addMangaToUserLibrary',
    async (args: { uid: string; manga_id: Id }) => {
        const manga_id = args.manga_id;
        const uid = args.uid;
        const response = await firestoreAddMangaToUserMangasList({
            manga_id: manga_id,
            uid: uid,
        });
        return { manga_id };
    }
);

export const removeMangaFromUserLibrary = createAsyncThunk(
    'user/removeMangaFromUserLibrary',
    async (args: { uid: string; manga_id: Id }) => {
        const manga_id = args.manga_id;
        const uid = args.uid;
        const response = await firestoreRemoveMangaFromUserMangasList({
            manga_id: manga_id,
            uid: uid,
        });
        return { manga_id };
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUpUser',
    async (args: { email: string; password: string; username: string }) => {
        const email = args.email;
        const password = args.password;
        const username = args.username;
        const response = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = response.user.uid;
        await setDoc(doc(collection(firestore, 'users'), uid), {
            email: email,
            username: username,
            mangas_list: [],
        });
        return { email, uid, username };
    }
);

export type UserData = {
    email?: string | undefined;
    username?: string | undefined;
    mangas_list: Id[];
};

export type UserState = UserData & {
    uid: string | undefined;
    logged: boolean;
};

const initialState: UserState = {
    uid: undefined,
    logged: false,
    mangas_list: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.logged = true;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.username = action.payload.user_data['username'];
            state.mangas_list = action.payload.user_data['mangas_list'];
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.logged = true;
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
        });
        builder.addCase(addMangaToUserLibrary.fulfilled, (state, action) => {
            if (!state.mangas_list.includes(action.payload.manga_id)) {
                state.mangas_list.push(action.payload.manga_id);
            }
        });
        builder.addCase(
            removeMangaFromUserLibrary.fulfilled,
            (state, action) => {
                const index = state.mangas_list.indexOf(
                    action.payload.manga_id
                );
                if (index > -1) {
                    state.mangas_list.splice(index, 1);
                }
            }
        );
    },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
