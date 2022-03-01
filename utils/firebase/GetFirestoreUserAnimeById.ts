import { FirestoreUser, FirestoreUserAnime } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    id: Id;
    user: FirestoreUser;
};

export default function getFirestoreUserAnimeById({
    id,
    user,
}: Args): FirestoreUserAnime {
    const index = user.user_animes_list
        .map((user_anime) => {
            return user_anime.anime_id;
        })
        .indexOf(id);
    return user.user_animes_list[index];
}
