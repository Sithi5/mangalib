import { Id, Nullable } from '../globals/GlobalTypes';

export type KitsuMangaAttributes = {
    posterImage?: {
        large?: Nullable<string>;
        medium?: Nullable<string>;
        small?: Nullable<string>;
        tiny?: Nullable<string>;
        original?: Nullable<string>;
        meta?: Nullable<{}>;
    };
    chapterCount?: Nullable<number>;
    volumeCount?: Nullable<number>;
    synopsis?: Nullable<string>;
    description?: Nullable<string>;
    titles?: Nullable<{
        en?: Nullable<string>;
        en_us?: Nullable<string>;
        en_jp?: Nullable<string>;
        ja_jp?: Nullable<string>;
    }>;
    slug?: Nullable<string>;
    averageRating?: Nullable<string>;
    ratingRank?: Nullable<number>;
    serialization?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    nextRelease?: Nullable<string>;
    popularityRank?: Nullable<number>;
    ageRating?: Nullable<string>;
    ageRatingGuide?: Nullable<string>;
    subtype?: Nullable<string>;
    mangaType?: Nullable<string>;
    tba?: Nullable<string>;
    status?: Nullable<string>;
    coverImage?: {
        tiny?: Nullable<string>;
        large?: Nullable<string>;
        small?: Nullable<string>;
        tiny_webp?: Nullable<string>;
        large_webp?: Nullable<string>;
        small_webp?: Nullable<string>;
        original?: Nullable<string>;
        meta?: Nullable<{}>;
    } | null;
    coverImageTopOffset?: Nullable<number>;
    canonicalTitle?: Nullable<string>;
    abbreviatedTitles?: string[];
    ratingFrequencies?: {};
    userCount?: Nullable<number>;
    favoritesCount?: Nullable<number>;
};

export type KitsuMangaData = {
    attributes: KitsuMangaAttributes;
    id: Id;
    links: {};
    relationships: {};
    type: Nullable<string>;
};

// Functions returns
export type SearchMangaKitsuResponse = {
    data: KitsuMangaData[];
    links: {
        first: Nullable<string>;
        next?: Nullable<string>;
        last: Nullable<string>;
        prev?: string;
    };
    meta: Nullable<number>;
};

export type GetMangaDetailsKitsuResponse = {
    data: KitsuMangaData;
    links: {
        first: Nullable<string>;
        next?: Nullable<string>;
        last: Nullable<string>;
        prev?: string;
    };
    meta: Nullable<number>;
};

export type GetMultipleMangasDetailsKitsuResponse = (
    | GetMangaDetailsKitsuResponse
    | undefined
)[];

// Functions args
export type ArgsGetMangaImageFromApi = {
    manga_id: Id;
    format: 'original' | 'small' | 'tiny' | 'medium' | 'large';
};

export type ArgsSearchMangasFromApi = {
    search_text: Nullable<string>;
    next_page_url?: Nullable<string>;
};

export type ArgsGetMangaDetailsFromApi = {
    manga_id: Id;
};

export type ArgsGetMultipleMangasDetailsFromApi = {
    manga_id_list: Id[];
};
