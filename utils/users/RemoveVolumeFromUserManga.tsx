import { FirestoreUserManga } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { updateUserMangasList, UserState } from 'redux/UserSlice';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    dispatch: AppDispatch;
};

export default async function removeVolumeFromUserManga({
    user,
    user_manga,
    dispatch,
}: Args) {
    const last_volume = Math.max(...user_manga.volumes);

    if (last_volume > 1) {
        try {
            if (user.uid) {
                const manga_index_in_user_mangas_list =
                    getMangasIdsListFromFirestoreUsersMangasList({
                        user_mangas_list: user.user_mangas_list,
                    }).indexOf(user_manga.manga_id);

                if (
                    user.user_mangas_list[manga_index_in_user_mangas_list]
                        .volumes.length > 1
                ) {
                    user.user_mangas_list[manga_index_in_user_mangas_list]
                        .volumes.length;
                    let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                        source_object: user.user_mangas_list,
                    });
                    const last_volume_number = Math.max(...user_manga.volumes);

                    // Removing possessed manga
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
