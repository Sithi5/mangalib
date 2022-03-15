import {
    KitsuAnimeAttributes,
    KitsuData,
    KitsuItemType,
    KitsuMangaAttributes,
} from 'api/KitsuTypes';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import {
    addAnimeToUserAnimeList,
    addMangaToUserMangaList,
} from 'redux/UserSliceAsyncThunk';
import {
    createNewFirestoreUserAnime,
    createNewFirestoreUserManga,
} from 'utils/firebase';

type Args = {
    user: UserState;
    item_type: KitsuItemType;
    item_title: string;
    item: KitsuData;
    dispatch: AppDispatch;
};

export default async function addItemToUser(args: Args) {
    const { user, item_type, dispatch, item_title, item } = args;
    if (user.uid !== undefined) {
        try {
            if (item_type === 'manga') {
                await dispatch(
                    addMangaToUserMangaList({
                        uid: user.uid,
                        user_manga: createNewFirestoreUserManga({
                            manga_name: item_title,
                            manga_id: item.id,
                            volumes_count: (
                                item.attributes as KitsuMangaAttributes
                            ).volumeCount,
                        }),
                    })
                );
            } else if (item_type === 'anime') {
                await dispatch(
                    addAnimeToUserAnimeList({
                        uid: user.uid,
                        user_anime: createNewFirestoreUserAnime({
                            anime_title: item_title,
                            anime_id: item.id,
                            total_episodes: (
                                item.attributes as KitsuAnimeAttributes
                            ).episodeCount,
                        }),
                    })
                );
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }
}
