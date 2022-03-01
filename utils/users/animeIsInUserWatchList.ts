import { FirestoreUser } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    user: FirestoreUser;
    anime_id: Id;
};

export default function animeIsInUserWatchList({
    user,
    anime_id,
}: Args): boolean {
    const anime_is_in_user_library = user.user_animes_list
        .map((user_anime) => {
            return user_anime.anime_id;
        })
        .includes(anime_id);
    return anime_is_in_user_library;
}
