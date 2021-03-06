import { Id, Nullable } from 'globals/GlobalTypes';

export type KitsuItemType = 'manga' | 'anime';

// Functions args
export type ArgsKitsuGetImage = {
    id: Id;
    item_type: KitsuItemType;
    format: 'original' | 'small' | 'tiny' | 'medium' | 'large';
};

export type ArgsKitsuSearch = {
    search_text: string;
    search_type: KitsuItemType;
    next_page_url?: string;
};

export type ArgsKitsuGetItemDetails = {
    id: Id;
    item_type: KitsuItemType;
};

export type ArgsKitsuGetMultipleMangasDetails = {
    item_id_list: Id[];
    item_type: KitsuItemType;
};

// Functions returns
export type KitsuSearchResponse = {
    data: KitsuData[];
    links: {
        first: Nullable<string>;
        next?: Nullable<string>;
        last: Nullable<string>;
        prev?: string;
    };
    meta: Nullable<number>;
};

export type KitsuGetItemDetailsResponse = {
    data: KitsuData;
    links: {
        first: Nullable<string>;
        next?: Nullable<string>;
        last: Nullable<string>;
        prev?: string;
    };
    meta: Nullable<number>;
};

export type KitsuGetMultipleItemsDetailsResponse = (
    | KitsuGetItemDetailsResponse
    | undefined
)[];

//Data type

export type KitsuData = {
    attributes: KitsuMangaAttributes | KitsuAnimeAttributes;
    id: Id;
    links: {};
    relationships: {};
    type: Nullable<string>;
};

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

export type KitsuAnimeAttributes = {
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    slug?: Nullable<string>;
    synopsis?: Nullable<string>;
    description?: Nullable<string>;
    coverImageTopOffset?: Nullable<number>;
    titles?: Nullable<{
        en?: Nullable<string>;
        en_us?: Nullable<string>;
        en_jp?: Nullable<string>;
        ja_jp?: Nullable<string>;
    }>;
    canonicalTitle?: Nullable<string>;
    abbreviatedTitles?: string[];
    averageRating?: Nullable<string>;
    ratingFrequencies?: {};
    userCount?: Nullable<number>;
    favoritesCount?: Nullable<number>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    nextRelease?: Nullable<string>;
    popularityRank?: Nullable<number>;

    ratingRank?: Nullable<number>;
    ageRating?: Nullable<string>;
    ageRatingGuide?: Nullable<string>;
    subtype?: Nullable<string>;
    status?: Nullable<string>;
    tba?: Nullable<string>;
    posterImage?: {
        large?: Nullable<string>;
        medium?: Nullable<string>;
        small?: Nullable<string>;
        tiny?: Nullable<string>;
        original?: Nullable<string>;
        meta?: Nullable<{}>;
    };
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
    episodeCount?: Nullable<number>;
    episodeLength?: Nullable<number>;
    totalLength?: Nullable<number>;
    youtubeVideoId?: Nullable<string>;
    showType?: Nullable<string>;
    nsfw?: Nullable<boolean>;
};
