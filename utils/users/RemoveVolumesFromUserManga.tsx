import { FirestoreUserManga } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserMangasList } from 'redux/UserSliceAsyncThunk';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    number_to_remove?: number;
    dispatch: AppDispatch;
};

export default async function removeVolumesFromUserManga({
    user,
    user_manga,
    number_to_remove = 1,
    dispatch,
}: Args) {
    const last_volume = Math.max(...user_manga.volumes);

    if (last_volume > number_to_remove) {
        try {
            if (user.uid) {
                const manga_index_in_user_mangas_list =
                    getMangasIdsListFromFirestoreUsersMangasList({
                        user_mangas_list: user.user_mangas_list,
                    }).indexOf(user_manga.manga_id);

                if (
                    user.user_mangas_list[manga_index_in_user_mangas_list]
                        .volumes.length > number_to_remove
                ) {
                    let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                        source_object: user.user_mangas_list,
                    });
                    let last_volume_number = Math.max(...user_manga.volumes);

                    // Removing possessed manga
                    while (number_to_remove > 0) {
                        let index =
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].possessed_volumes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].possessed_volumes.splice(index, 1);
                        }
                        // Removing volume manga
                        index =
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].volumes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].volumes.splice(index, 1);
                        }
                        number_to_remove -= 1;
                        last_volume_number -= 1;
                    }

                    await dispatch(
                        updateUserMangasList({
                            uid: user.uid,
                            user_mangas_list: new_user_mangas_list,
                        })
                    );
                }
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
}
