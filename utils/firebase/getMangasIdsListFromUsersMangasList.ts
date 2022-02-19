import { FirestoreUser, FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    user: FirestoreUser;
};

export default function getMangasIdsListFromUsersMangasList({ user }: Args) {
    return user.user_mangas_list.map((user_manga) => {
        return user_manga.manga_id;
    });
}
