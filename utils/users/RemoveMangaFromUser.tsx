import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { removeMangaFromUserMangaList } from 'redux/UserSliceAsyncThunk';
import { asyncAlert } from 'utils/alerts';
import mangaIsInUserLibrary from './MangaIsInUserLibrary';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    manga_id: Id;
    dispatch: AppDispatch;
};

/** Remove manga from user and return true if the manga is well removed.*/
export default async function removeMangaFromUser({
    user,
    user_manga,
    manga_id,
    dispatch,
}: Args): Promise<boolean> {
    async function _removeUserManga(): Promise<void> {
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
            throw error;
        }
    }
    if (mangaIsInUserLibrary({ user: user, manga_id: manga_id })) {
        const response = await asyncAlert({
            title: 'Remove manga from library',
            message:
                'Are you sure you want to remove this manga from your library?',
            alertYesFunction: _removeUserManga,
        });
        return response;
    }
    return false;
}
