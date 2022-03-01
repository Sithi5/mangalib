import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    anime_id: Id;
    anime_name: string;
    episodes_count?: number | null;
};

export default function createNewFirestoreUserAnime({
    anime_id,
    anime_name,
    episodes_count,
}: Args): FirestoreUserAnime {
    if (!episodes_count) {
        episodes_count = 1;
    }
    let episodes: number[] = [];
    while (episodes_count > 0) {
        episodes.push(episodes_count);
        episodes_count -= 1;
    }
    episodes.reverse();
    const new_user_anime: FirestoreUserAnime = {
        anime_name: anime_name,
        anime_id: anime_id,
        episodes: episodes,
        seen_episodes: [],
    };
    return new_user_anime;
}
