import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserAnimesList } from 'redux/UserSliceAsyncThunk';
import { getAnimesIdsListFromFirestoreUsersAnimesList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_anime: FirestoreUserAnime;
    from_number: number;
    to_number: number;
    dispatch: AppDispatch;
};

/** Add volumes from 'from_number' to 'to_number' to User possessed volumes.*/
export default async function addToUserAnimeSeenEpisodes({
    user,
    user_anime,
    from_number,
    to_number,
    dispatch,
}: Args) {
    const anime_index_in_user_animes_list =
        getAnimesIdsListFromFirestoreUsersAnimesList({
            user_animes_list: user.user_animes_list,
        }).indexOf(user_anime.anime_id);

    if (user.uid) {
        let current_volume = from_number;
        let new_user_animes_list: FirestoreUserAnime[] = deepCopy({
            source_object: user.user_animes_list,
        });
        while (current_volume <= to_number) {
            if (
                !new_user_animes_list[
                    anime_index_in_user_animes_list
                ].seen_episodes.includes(current_volume)
            ) {
                new_user_animes_list[
                    anime_index_in_user_animes_list
                ].seen_episodes.push(current_volume);
            }
            current_volume++;
        }
        new_user_animes_list[
            anime_index_in_user_animes_list
        ].seen_episodes.sort(function (a, b) {
            return a - b;
        });
        try {
            await dispatch(
                updateUserAnimesList({
                    uid: user.uid,
                    user_animes_list: new_user_animes_list,
                })
            );
        } catch (error: any) {
            console.error(error.message);
        }
    }
}
