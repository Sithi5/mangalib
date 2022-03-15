import { Id } from 'globals/GlobalTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import {
    removeAnimeFromUserAnimeList,
    removeMangaFromUserMangaList,
} from 'redux/UserSliceAsyncThunk';
import { asyncAlert } from 'utils/alerts';
import {
    getFirestoreUserAnimeById,
    getFirestoreUserMangaById,
} from 'utils/firebase';
import animeIsInUserWatchList from './AnimeIsInUserWatchList';
import mangaIsInUserLibrary from './MangaIsInUserLibrary';

export type Args = {
    user: UserState;
    item_id: Id;
    item_type: string;
    dispatch: AppDispatch;
};

/** Remove item from user and return true if the item is well removed.*/
export default async function removeItemFromUser({
    user,
    item_id,
    item_type,
    dispatch,
}: Args): Promise<boolean> {
    async function _removeUserItem(): Promise<void> {
        try {
            if (user.uid !== undefined) {
                if (item_type === 'manga') {
                    await dispatch(
                        removeMangaFromUserMangaList({
                            uid: user.uid,
                            user_manga: getFirestoreUserMangaById({
                                id: item_id,
                                user: user,
                            }),
                        })
                    );
                } else {
                    await dispatch(
                        removeAnimeFromUserAnimeList({
                            uid: user.uid,
                            user_anime: getFirestoreUserAnimeById({
                                id: item_id,
                                user: user,
                            }),
                        })
                    );
                }
            }
        } catch (error: any) {
            throw error;
        }
    }
    if (
        item_type === 'manga' &&
        mangaIsInUserLibrary({ user: user, manga_id: item_id })
    ) {
        const response = await asyncAlert({
            title: 'Remove manga from library',
            message:
                'Are you sure you want to remove this manga from your library?',
            alertYesFunction: _removeUserItem,
        });
        return response;
    } else if (
        item_type === 'anime' &&
        animeIsInUserWatchList({ user: user, anime_id: item_id })
    ) {
        const response = await asyncAlert({
            title: 'Remove anime from watchlist',
            message:
                'Are you sure you want to remove this anime from your watchlist?',
            alertYesFunction: _removeUserItem,
        });
        return response;
    }
    return false;
}
