import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    user_animes_list: FirestoreUserAnime[];
};

export default function getAnimesIdsListFromFirestoreUsersAnimesList({
    user_animes_list,
}: Args): Id[] {
    return user_animes_list.map((user_anime) => {
        return user_anime.anime_id;
    });
}
