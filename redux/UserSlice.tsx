import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserData } from 'api/FireBase';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { Id } from '../globals/GlobalTypes';

const auth = getAuth();
const firestore = getFirestore();

export const signInUser = createAsyncThunk(
    'user/signIn',
    async (args: { email: string; password: string }) => {
        const email = args.email;
        const password = args.password;
        const response = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const uid = response.user.uid;
        const snapshot = await getUserData({ uid: uid });
        let user_data: UserData;
        if (snapshot.exists()) {
            user_data = snapshot.data();
        } else {
            throw "User data doesn't exist.";
        }
        return { email, uid, user_data };
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUp',
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
        });
        return { email, uid, username };
    }
);

export type UserData = {
    email?: string | undefined;
    username?: string | undefined;
    mangas_list?: Id[];
};

export type UserState = {
    email?: string | undefined;
    username?: string | undefined;
    uid: string | undefined;
    mangas_list: Id[];
    logged: boolean;
};

const initialState: UserState = {
    uid: undefined,
    logged: false,
    mangas_list: [],
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        fetchUserData: (state, action: PayloadAction<void>) => {
            if (state.uid) {
            } else {
                console.error("can't fetch user data without uid.");
            }
        },
        signOutUser: (state, action: PayloadAction<void>) => {
            state.uid = undefined;
            state.logged = false;
            signOut(auth);
        },
        updateUserUid: (state, action: PayloadAction<string | undefined>) => {
            state.uid = action.payload;
            state.logged = state.uid === undefined ? false : true;
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
    extraReducers: (builder) => {
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.logged = true;
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.username = action.payload.user_data['username'];
        });
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.logged = true;
            state.uid = action.payload.uid;
            state.username = action.payload.username;
            state.email = action.payload.email;
        });
    },
});

// Action creators are generated for each case reducer function
export const { addUserManga, removeFromUser, updateUserUid, signOutUser } =
    userSlice.actions;

export default userSlice.reducer;
