import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { removeMangaFromUserMangaList } from 'redux/UserSliceAsyncThunk';
import { alertRemoveMangaFromLibrary } from 'utils/alerts';
import mangaIsInUserLibrary from './MangaIsInUserLibrary';

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
}: Args): Promise<void> {
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
    if (mangaIsInUserLibrary({ user: user, manga_id: manga_id })) {
        alertRemoveMangaFromLibrary({
            alertYesFunction: _removeUserManga,
        });
    }
}
