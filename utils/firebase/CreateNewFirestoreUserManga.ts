import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    manga_id: Id;
    manga_name: string;
};

export default function createNewFirestoreUserManga({
    manga_id,
    manga_name,
}: Args): FirestoreUserManga {
    const new_user_manga: FirestoreUserManga = {
        manga_name: manga_name,
        manga_id: manga_id,
        volumes: [1],
        possessed_volumes: [],
    };
    return new_user_manga;
}
