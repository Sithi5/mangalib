import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import { updateUserAnimesList } from 'redux/UserSliceAsyncThunk';
import { getAnimesIdsListFromFirestoreUsersAnimesList } from 'utils/firebase';
import { deepCopy } from 'utils/objects';

export type Args = {
    user: UserState;
    user_anime: FirestoreUserAnime;
    number_to_add?: number;
    dispatch: AppDispatch;
};

export default async function addEpisodesToUserAnime({
    user,
    user_anime,
    number_to_add = 1,
    dispatch,
}: Args) {
    try {
        if (user.uid) {
            const manga_index_in_user_animes_list =
                getAnimesIdsListFromFirestoreUsersAnimesList({
                    user_animes_list: user.user_animes_list,
                }).indexOf(user_anime.anime_id);
            let last_volume = Math.max(...user_anime.episodes);
            user.user_animes_list.indexOf(user_anime);
            let new_user_animes_list: FirestoreUserAnime[] = deepCopy({
                source_object: user.user_animes_list,
            });
            while (number_to_add > 0) {
                new_user_animes_list[
                    manga_index_in_user_animes_list
                ].episodes.push(last_volume + 1);
                last_volume += 1;
                number_to_add -= 1;
            }
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
