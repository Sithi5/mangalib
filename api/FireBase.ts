import {
    collection,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { Id } from 'globals/GlobalTypes';

const firestore = getFirestore();

export type GetUserDataArgs = {
    uid: string;
};
export async function getUserData({ uid }: GetUserDataArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await getDoc(users_doc);
        return response;
    } catch (error) {
        throw error;
    }
}

export type UpdateUserEmailArgs = {
    uid: string;
    email: string;
};

export async function updateUserEmail({ uid, email }: UpdateUserEmailArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, { email: email });
        return response;
    } catch (error) {
        throw error;
    }
}

export type UpdateUserUsernameArgs = {
    uid: string;
    username: string;
};

export async function updateUserUsername({
    uid,
    username,
}: UpdateUserUsernameArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, { username: username });
        return response;
    } catch (error) {
        throw error;
    }
}

export type UpdateUserMangasListArgs = {
    uid: string;
    mangas_list: Id[];
};

export async function updateUserMangasList({
    uid,
    mangas_list,
}: UpdateUserMangasListArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            mangas_list: mangas_list,
        });
        return response;
    } catch (error) {
        throw error;
    }
}
