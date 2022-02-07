const API_BASE_URL = 'https://kitsu.io/api/edge/';
const HEADERS = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
};

export async function getMangaDetailFromApi(manga_title: string) {
    const url = API_BASE_URL + 'manga?filter[text]=' + manga_title;
    console.log('\n\n\nURL = ', url, '\n\n');
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: HEADERS,
        });
        return await response.json();
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
