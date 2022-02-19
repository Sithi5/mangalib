import { KITSU_PAGE_LIMIT } from '../globals/API';
import {
    ArgsKitsuGetImage,
    ArgsKitsuGetItemDetails,
    ArgsKitsuGetMultipleMangasDetails,
    ArgsKitsuSearch,
    KitsuGetItemDetailsResponse,
    KitsuGetMultipleItemsDetailsResponse,
    KitsuSearchResponse,
} from './KitsuTypes';

const API_BASE_URL = 'https://kitsu.io/api/edge/';
const API_MEDIA_BASE_URL = 'https://media.kitsu.io/';

const HEADERS = {
    Accept: 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
};

export async function kitsuSearch({
    search_text,
    search_type = 'manga',
    next_page_url = undefined,
}: ArgsKitsuSearch): Promise<KitsuSearchResponse | undefined> {
    const url = next_page_url
        ? next_page_url
        : encodeURI(
              API_BASE_URL +
                  search_type +
                  '?' +
                  'filter[text]=' +
                  search_text +
                  '&page[offset]=' +
                  0 +
                  '&page[limit]=' +
                  KITSU_PAGE_LIMIT
          );
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

export function kitsuGetItemImage({
    id,
    item_type,
    format = 'original',
}: ArgsKitsuGetImage): string {
    const url = encodeURI(
        API_MEDIA_BASE_URL +
            item_type +
            '/poster_images/' +
            id +
            '/' +
            format +
            '.jpg'
    );
    // console.log('\nKITSU IMAGE URL CREATION: ', url);
    return url;
}

export async function kitsuGetItemDetails({
    id,
    item_type,
}: ArgsKitsuGetItemDetails): Promise<KitsuGetItemDetailsResponse | undefined> {
    const url = encodeURI(API_BASE_URL + item_type + '/' + id);
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

export async function kitsuGetMultipleItemsDetails({
    item_id_list,
    item_type,
}: ArgsKitsuGetMultipleMangasDetails): Promise<
    KitsuGetMultipleItemsDetailsResponse | undefined
> {
    try {
        const responses = await Promise.all(
            item_id_list.map(async (id) =>
                kitsuGetItemDetails({ id: id, item_type: item_type })
            )
        );
        return responses;
    } catch (error) {
        console.error(error);
    }
}
