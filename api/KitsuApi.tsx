import { KITSU_PAGE_LIMIT } from '../globals/API';
import { Id } from '../globals/GlobalTypes';
import {
    ArgsGetMangaDetailsFromApi,
    ArgsGetMangaImageFromApi,
    ArgsSearchMangasFromApi,
    GetMangaDetailsKitsuResponse,
    SearchMangaKitsuResponse,
} from './KitsuTypes';

const API_BASE_URL = 'https://kitsu.io/api/edge/';
const API_MEDIA_BASE_URL = 'https://media.kitsu.io/';

const HEADERS = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
};

export async function searchMangasFromApi({
    search_text,
    next_page_url = undefined,
}: ArgsSearchMangasFromApi): Promise<SearchMangaKitsuResponse | undefined> {
    const url = next_page_url
        ? next_page_url
        : encodeURI(
              API_BASE_URL +
                  'manga?' +
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

export function getMangaImageFromApi({
    manga_id,
    format = 'original',
}: ArgsGetMangaImageFromApi): string {
    const url = encodeURI(
        API_MEDIA_BASE_URL +
            'manga/poster_images/' +
            manga_id +
            '/' +
            format +
            '.jpg'
    );
    // console.log('\nKITSU IMAGE URL CREATION: ', url);
    return url;
}

export async function getMangaDetailsFromApi({
    manga_id,
}: ArgsGetMangaDetailsFromApi): Promise<
    GetMangaDetailsKitsuResponse | undefined
> {
    const url = encodeURI(API_BASE_URL + 'manga/' + manga_id);
    console.log('\nKITSU GET REQUEST: ', url);
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
