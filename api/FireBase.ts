import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

export type Args = {
    uid: string;
};
const firestore = getFirestore();

export async function getUserData({ uid }: Args) {
    try {
        const response = await getDoc(doc(collection(firestore, 'users'), uid));
        return response;
    } catch (error) {
        throw error;
    }
}
