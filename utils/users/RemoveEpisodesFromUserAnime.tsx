import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserAnimesList } from 'redux/UserSliceAsyncThunk';
import { getAnimesIdsListFromFirestoreUsersAnimesList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_anime: FirestoreUserAnime;
    number_to_remove?: number;
    dispatch: AppDispatch;
};

export default async function removeEpisodesFromUserAnime({
    user,
    user_anime,
    number_to_remove = 1,
    dispatch,
}: Args) {
    const last_episode = Math.max(...user_anime.episodes);

    if (last_episode > number_to_remove) {
        try {
            if (user.uid) {
                const anime_index_in_user_animes_list =
                    getAnimesIdsListFromFirestoreUsersAnimesList({
                        user_animes_list: user.user_animes_list,
                    }).indexOf(user_anime.anime_id);

                if (
                    user.user_animes_list[anime_index_in_user_animes_list]
                        .episodes.length > number_to_remove
                ) {
                    let new_user_animes_list: FirestoreUserAnime[] = deepCopy({
                        source_object: user.user_animes_list,
                    });
                    let last_volume_number = Math.max(...user_anime.episodes);

                    // Removing possessed manga
                    while (number_to_remove > 0) {
                        let index =
                            new_user_animes_list[
                                anime_index_in_user_animes_list
                            ].seen_episodes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_animes_list[
                                anime_index_in_user_animes_list
                            ].seen_episodes.splice(index, 1);
                        }
                        // Removing volume manga
                        index =
                            new_user_animes_list[
                                anime_index_in_user_animes_list
                            ].episodes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_animes_list[
                                anime_index_in_user_animes_list
                            ].episodes.splice(index, 1);
                        }
                        number_to_remove -= 1;
                        last_volume_number -= 1;
                    }

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
}
