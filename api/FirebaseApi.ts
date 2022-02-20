import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import {
    ArgsAddMangaToUserMangasList,
    ArgsAddVolumeToUserMangaPossessedVolume,
    ArgsAddVolumeToUserMangaVolumes,
    ArgsFireforceGetUserData,
    ArgsRemoveMangaFromUserMangasList,
    ArgsUpdateUserEmail,
    ArgsUpdateUserMangasList,
    ArgsUpdateUserUsername,
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

export async function firestoreAddVolumeToUserPossessedVolume({
    volume_number,
    user_manga,
}: ArgsAddVolumeToUserMangaPossessedVolume) {
    try {
    } catch (error) {
        throw error;
    }
}
export async function firestoreAddVolumeToUserMangaVolumes({
    volume_number,
    user_manga,
}: ArgsAddVolumeToUserMangaVolumes) {
    try {
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
