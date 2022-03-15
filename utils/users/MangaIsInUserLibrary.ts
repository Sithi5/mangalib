import { FirestoreUser } from 'api/FirebaseTypes';
import { Id } from 'globals/GlobalTypes';

type Args = {
    user: FirestoreUser;
    manga_id: Id;
};

export default function mangaIsInUserLibrary({
    user,
    manga_id,
}: Args): boolean {
    const manga_is_in_user_library = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .includes(manga_id);
    return manga_is_in_user_library;
}
