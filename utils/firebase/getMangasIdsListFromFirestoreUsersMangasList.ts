import { FirestoreUser, FirestoreUserManga } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    user_mangas_list: FirestoreUserManga[];
};

export default function getMangasIdsListFromFirestoreUsersMangasList({
    user_mangas_list,
}: Args): Id[] {
    return user_mangas_list.map((user_manga) => {
        return user_manga.manga_id;
    });
}
