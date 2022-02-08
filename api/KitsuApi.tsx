import { PAGE_LIMIT } from '../globals/API';

import type { MangaData } from '../types/MangaData';

const API_BASE_URL = 'https://kitsu.io/api/edge/';
const HEADERS = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
};

type GetMangaDetailResponse = {
    data: MangaData[];
    links: { first: string; next: string; last: string };
    meta: number;
};

export async function getMangaDetailFromApi(
    manga_title: string,
    next_page_url: string | undefined
): Promise<GetMangaDetailResponse | undefined> {
    const url = next_page_url
        ? next_page_url
        : API_BASE_URL +
          'manga?' +
          encodeURI(
              'filter[text]=' +
                  manga_title +
                  '&page[offset]=' +
                  0 +
                  '&page[limit]=' +
                  PAGE_LIMIT
          );

    console.log('url = ', url);

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
