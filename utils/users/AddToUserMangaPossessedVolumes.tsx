import { FirestoreUserManga } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserMangasList } from 'redux/UserSliceAsyncThunk';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    from_number: number;
    to_number: number;
    dispatch: AppDispatch;
};

/** Add volumes from 'from_number' to 'to_number' to User possessed volumes.*/
export default async function addToUserMangaPossessedVolumes({
    user,
    user_manga,
    from_number,
    to_number,
    dispatch,
}: Args) {
    const manga_index_in_user_mangas_list =
        getMangasIdsListFromFirestoreUsersMangasList({
            user_mangas_list: user.user_mangas_list,
        }).indexOf(user_manga.manga_id);

    if (user.uid) {
        let current_volume = from_number;
        let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
            source_object: user.user_mangas_list,
        });
        while (current_volume <= to_number) {
            if (
                !new_user_mangas_list[
                    manga_index_in_user_mangas_list
                ].possessed_volumes.includes(current_volume)
            )
                new_user_mangas_list[
                    manga_index_in_user_mangas_list
                ].possessed_volumes.push(current_volume);
            current_volume++;
        }
        new_user_mangas_list[
            manga_index_in_user_mangas_list
        ].possessed_volumes.sort(function (a, b) {
            return a - b;
        });
        try {
            await dispatch(
                updateUserMangasList({
                    uid: user.uid,
                    user_mangas_list: new_user_mangas_list,
                })
            );
        } catch (error: any) {
            console.error(error.message);
        }
    }
}
