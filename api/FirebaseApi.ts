import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import {
    ArgsAddAnimeToUserAnimesList,
    ArgsAddMangaToUserMangasList,
    ArgsFireforceCreateUserData,
    ArgsFireforceGetUserData,
    ArgsRemoveAnimeFromUserAnimesList,
    ArgsRemoveMangaFromUserMangasList,
    ArgsUpdateUserAnimesList,
    ArgsUpdateUserEmail,
    ArgsUpdateUserMangasList,
    ArgsUpdateUserUsername,
    FirestoreUser,
} from './FirebaseTypes';

const firestore = getFirestore();

export async function firestoreGetUserData({ uid }: ArgsFireforceGetUserData) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await getDoc(users_doc);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreCreateUserData({
    uid,
    email,
    username,
}: ArgsFireforceCreateUserData) {
    try {
        const user_data: FirestoreUser = {
            email: email,
            username: username,
            user_mangas_list: [],
            user_animes_list: [],
        };
        const response = await setDoc(
            doc(collection(firestore, 'users'), uid),
            user_data
        );
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreUpdateUserEmail({
    uid,
    email,
}: ArgsUpdateUserEmail) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, { email: email });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreUpdateUserUsername({
    uid,
    username,
}: ArgsUpdateUserUsername) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, { username: username });
        return response;
    } catch (error) {
        throw error;
    }
}

// Mangas

export async function firestoreUpdateUserMangasList({
    uid,
    user_mangas_list,
}: ArgsUpdateUserMangasList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_mangas_list: user_mangas_list,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreAddMangaToUserMangasList({
    uid,
    user_manga,
}: ArgsAddMangaToUserMangasList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_mangas_list: arrayUnion(user_manga),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreRemoveMangaFromUserMangasList({
    uid,
    user_manga,
}: ArgsRemoveMangaFromUserMangasList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_mangas_list: arrayRemove(user_manga),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// Animes

export async function firestoreUpdateUserAnimesList({
    uid,
    user_animes_list,
}: ArgsUpdateUserAnimesList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_animes_list: user_animes_list,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreAddAnimeToUserAnimesList({
    uid,
    user_anime,
}: ArgsAddAnimeToUserAnimesList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_animes_list: arrayUnion(user_anime),
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function firestoreRemoveAnimeFromUserAnimesList({
    uid,
    user_anime,
}: ArgsRemoveAnimeFromUserAnimesList) {
    try {
        const users_doc = doc(collection(firestore, 'users'), uid);
        const response = await updateDoc(users_doc, {
            user_animes_list: arrayRemove(user_anime),
        });
        return response;
    } catch (error) {
        throw error;
    }
}
