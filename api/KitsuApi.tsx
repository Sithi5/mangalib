import { KITSU_PAGE_LIMIT } from '../globals/API';
import { Id } from '../globals/GlobalTypes';
import { KitsuSearchMangaTitleResponse } from './KitsuTypes';

const API_BASE_URL = 'https://kitsu.io/api/edge/';
const API_MEDIA_BASE_URL = 'https://media.kitsu.io/';

const HEADERS = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
};

type ArgsSearchMangasFromApi = {
    search_text: string;
    next_page_url?: string | undefined;
};

export async function searchMangasFromApi({
    search_text,
    next_page_url = undefined,
}: ArgsSearchMangasFromApi): Promise<
    KitsuSearchMangaTitleResponse | undefined
> {
    const url = next_page_url
        ? next_page_url
        : API_BASE_URL +
          'manga?' +
          encodeURI(
              'filter[text]=' +
                  search_text +
                  '&page[offset]=' +
                  0 +
                  '&page[limit]=' +
                  KITSU_PAGE_LIMIT
          );
    // console.log('\nKITSU GET REQUEST: ', url);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: HEADERS,
        });
        const json_response = await response.json();
        return json_response;
    } catch (error) {
        console.error(error);
    }
}

type ArgsGetMangaImageFromApi = {
    manga_id: Id;
    format: 'original' | 'small' | 'tiny' | 'medium' | 'large';
};

// getImageFromTMDBApi(manga.poster_path, 'w300');
export function getMangaImageFromApi({
    manga_id,
    format = 'original',
}: ArgsGetMangaImageFromApi): string {
    const url =
        API_MEDIA_BASE_URL +
        'manga/poster_images/' +
        manga_id +
        '/' +
        format +
        '.jpg';
    // console.log('\nKITSU IMAGE URL CREATION: ', url);
    return url;
}

// export function getImageFromTMDBApi(
//     name: string = '',
//     format: string = 'w300'
// ) {
//     return API_IMAGE_BASE_URL + format + name;
// }

// export default async function getFilmsFromTMDBApiWithSearchedText(
//     text: string,
//     page: number
// ) {
//     const url =
//         API_BASE_URL +
//         '3/search/movie?api_key=' +
//         API_KEY +
//         '&query=' +
//         text +
//         '&page=' +
//         page;
//     try {
//         const response = await fetch(url);
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//     }
// }
