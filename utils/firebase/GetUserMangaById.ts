import { FirestoreUser, FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    id: Id;
    user: FirestoreUser;
};

export default function getFirestoreUserMangaById({ id, user }: Args) {
    const index = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .indexOf(id);
    return user.user_mangas_list[index];
}
