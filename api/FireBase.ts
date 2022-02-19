import {
    arrayRemove,
    arrayUnion,
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
export async function firestoreGetUserData({ uid }: GetUserDataArgs) {
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

export async function firestoreUpdateUserEmail({
    uid,
    email,
}: UpdateUserEmailArgs) {
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

export async function firestoreUpdateUserUsername({
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

export async function firestoreUpdateUserMangasList({
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

export type AddMangaToUserMangasListArgs = {
    uid: string;
    manga_id: Id;
};

export async function firestoreAddMangaToUserMangasList({
    uid,
    manga_id,
}: AddMangaToUserMangasListArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            mangas_list: arrayUnion(manga_id),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export type RemoveMangaFromUserMangasListArgs = {
    uid: string;
    manga_id: Id;
};

export async function firestoreRemoveMangaFromUserMangasList({
    uid,
    manga_id,
}: RemoveMangaFromUserMangasListArgs) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            mangas_list: arrayRemove(manga_id),
        });
        return response;
    } catch (error) {
        throw error;
    }
}
