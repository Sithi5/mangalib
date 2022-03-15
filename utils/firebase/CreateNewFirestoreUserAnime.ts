import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    anime_id: Id;
    anime_title: string;
    total_episodes?: number | null;
};

export default function createNewFirestoreUserAnime({
    anime_id,
    anime_title,
    total_episodes,
}: Args): FirestoreUserAnime {
    if (!total_episodes) {
        total_episodes = 1;
    }
    const new_user_anime: FirestoreUserAnime = {
        anime_title: anime_title,
        anime_id: anime_id,
        total_episodes: total_episodes,
        seen_episodes: [],
    };
    return new_user_anime;
}
