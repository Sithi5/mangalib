import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';
import { AppDispatch } from 'redux/store';
import {
    removeMangaFromUserMangaList,
    updateUserMangasList,
    UserState,
} from 'redux/UserSlice';
import { alertRemoveMangaFromLibrary } from 'utils/alerts';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    manga_id: Id;
    dispatch: AppDispatch;
};

export default async function removeMangaFromUser({
    user,
    user_manga,
    manga_id,
    dispatch,
}: Args) {
    const manga_is_in_library = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .includes(manga_id);
    async function _removeUserManga() {
        try {
            if (user.uid !== undefined) {
                await dispatch(
                    removeMangaFromUserMangaList({
                        uid: user.uid,
                        user_manga,
                    })
                );
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
    if (manga_is_in_library) {
        alertRemoveMangaFromLibrary({
            alertYesFunction: _removeUserManga,
        });
    }
}
