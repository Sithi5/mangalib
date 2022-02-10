import { Id } from '../globals/GlobalTypes';

export type KitsuMangaAttributes = {
    posterImage: {
        large: string;
        medium: string;
        small: string;
        tiny: string;
        original: string;
        meta: {};
    };
    chapterCount: number;
    id: Id;
    synopsis: string;
    titles: {
        en: string;
        en_jp: string;
        en_us: string;
        ja_jp: string;
    };
    slug: string;
    averageRating: string;
    ratingRank: number;
    serialization: string;
    startDate: string;
    status: string;
};

export type KitsuMangaData = {
    attributes: KitsuMangaAttributes;
    id: Id;
    links: {};
    relationships: {};
    type: string;
};

// Functions returns
export type SearchMangaKitsuResponse = {
    data: KitsuMangaData[];
    links: { first: string; next?: string; last: string; prev?: string };
    meta: number;
};

export type GetMangaDetailsKitsuResponse = {
    data: KitsuMangaData;
    links: { first: string; next?: string; last: string; prev?: string };
    meta: number;
};

// Functions args
export type ArgsGetMangaImageFromApi = {
    manga_id: Id;
    format: 'original' | 'small' | 'tiny' | 'medium' | 'large';
};

export type ArgsSearchMangasFromApi = {
    search_text: string;
    next_page_url?: string | undefined;
};

export type ArgsGetMangaDetailsFromApi = {
    manga_id: Id;
};
