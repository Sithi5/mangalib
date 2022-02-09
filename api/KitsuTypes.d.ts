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
    synopsis: description;
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

export type KitsuData = {
    attributes: KitsuMangaAttributes;
    id: number;
    links: {};
    relationships: {};
    type: string;
};

export type KitsuSearchMangaTitleResponse = {
    data: KitsuData[];
    links: { first: string; next?: string; last: string; prev?: string };
    meta: number;
};
