import { FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    id: Id;
};

export default function createNewFirestoreUserManga({
    id,
}: Args): FirestoreUserManga {
    const new_user_manga: FirestoreUserManga = {
        manga_id: id,
        total_books: 1,
        possessed_books: [],
    };
    return new_user_manga;
}
