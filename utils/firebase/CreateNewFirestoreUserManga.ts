import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    manga_id: Id;
    manga_name: string;
    volumes_count?: number | null;
};

export default function createNewFirestoreUserManga({
    manga_id,
    manga_name,
    volumes_count,
}: Args): FirestoreUserManga {
    if (!volumes_count) {
        volumes_count = 1;
    }
    const new_user_manga: FirestoreUserManga = {
        manga_name: manga_name,
        manga_id: manga_id,
        total_volumes: volumes_count,
        possessed_volumes: [],
    };
    return new_user_manga;
}
