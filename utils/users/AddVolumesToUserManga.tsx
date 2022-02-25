import { FirestoreUserManga } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserMangasList } from 'redux/UserSliceAsyncThunk';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    number_to_add?: number;

    dispatch: AppDispatch;
};

export default async function addVolumesToUserManga({
    user,
    user_manga,
    number_to_add = 1,
    dispatch,
}: Args) {
    try {
        if (user.uid) {
            const manga_index_in_user_mangas_list =
                getMangasIdsListFromFirestoreUsersMangasList({
                    user_mangas_list: user.user_mangas_list,
                }).indexOf(user_manga.manga_id);
            let last_volume = Math.max(...user_manga.volumes);
            user.user_mangas_list.indexOf(user_manga);
            let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                source_object: user.user_mangas_list,
            });
            while (number_to_add > 0) {
                new_user_mangas_list[
                    manga_index_in_user_mangas_list
                ].volumes.push(last_volume + 1);
                last_volume += 1;
                number_to_add -= 1;
            }
            await dispatch(
                updateUserMangasList({
                    uid: user.uid,
                    user_mangas_list: new_user_mangas_list,
                })
            );
        }
    } catch (error: any) {
        console.error(error.message);
    }
}
