import { FirestoreUserManga } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { updateUserMangasList, UserState } from 'redux/UserSlice';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_manga: FirestoreUserManga;
    volume_number: number;
    dispatch: AppDispatch;
};

export default async function addOrRemoveFromUserPossessedVolumes({
    user,
    user_manga,
    volume_number,
    dispatch,
}: Args) {
    const manga_index_in_user_mangas_list =
        getMangasIdsListFromFirestoreUsersMangasList({
            user_mangas_list: user.user_mangas_list,
        }).indexOf(user_manga.manga_id);

    async function _addToUserPossessedVolumes() {
        try {
            if (user.uid) {
                let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                    source_object: user.user_mangas_list,
                });
                if (
                    !new_user_mangas_list[
                        manga_index_in_user_mangas_list
                    ].possessed_volumes.includes(volume_number)
                )
                    new_user_mangas_list[
                        manga_index_in_user_mangas_list
                    ].possessed_volumes.push(volume_number);
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

    async function _removeFromUserPossessedVolumes() {
        try {
            if (user.uid) {
                let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                    source_object: user.user_mangas_list,
                });

                const index =
                    new_user_mangas_list[
                        manga_index_in_user_mangas_list
                    ].possessed_volumes.indexOf(volume_number);
                if (index > -1) {
                    new_user_mangas_list[
                        manga_index_in_user_mangas_list
                    ].possessed_volumes.splice(index, 1);
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

    if (user_manga.possessed_volumes.includes(volume_number)) {
        _removeFromUserPossessedVolumes();
    } else {
        _addToUserPossessedVolumes();
    }
}
