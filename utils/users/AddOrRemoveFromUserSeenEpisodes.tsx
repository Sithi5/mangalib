import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserAnimesList } from 'redux/UserSliceAsyncThunk';
import { getAnimesIdsListFromFirestoreUsersAnimesList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_anime: FirestoreUserAnime;
    episode_number: number;
    dispatch: AppDispatch;
};

export default async function addOrRemoveFromUserSeenEpisodes({
    user,
    user_anime,
    episode_number,
    dispatch,
}: Args) {
    const manga_index_in_user_animes_list =
        getAnimesIdsListFromFirestoreUsersAnimesList({
            user_animes_list: user.user_animes_list,
        }).indexOf(user_anime.anime_id);

    async function _addToUserPossessedVolumes() {
        try {
            if (user.uid) {
                let new_user_animes_list: FirestoreUserAnime[] = deepCopy({
                    source_object: user.user_animes_list,
                });
                if (
                    !new_user_animes_list[
                        manga_index_in_user_animes_list
                    ].seen_episodes.includes(episode_number)
                )
                    new_user_animes_list[
                        manga_index_in_user_animes_list
                    ].seen_episodes.push(episode_number);
                await dispatch(
                    updateUserAnimesList({
                        uid: user.uid,
                        user_animes_list: new_user_animes_list,
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
                let new_user_animes_list: FirestoreUserAnime[] = deepCopy({
                    source_object: user.user_animes_list,
                });

                const index =
                    new_user_animes_list[
                        manga_index_in_user_animes_list
                    ].seen_episodes.indexOf(episode_number);
                if (index > -1) {
                    new_user_animes_list[
                        manga_index_in_user_animes_list
                    ].seen_episodes.splice(index, 1);
                    await dispatch(
                        updateUserAnimesList({
                            uid: user.uid,
                            user_animes_list: new_user_animes_list,
                        })
                    );
                }
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    if (user_anime.seen_episodes.includes(episode_number)) {
        _removeFromUserPossessedVolumes();
    } else {
        _addToUserPossessedVolumes();
    }
}
