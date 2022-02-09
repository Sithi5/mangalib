import { Id } from '../globals/GlobalTypes';

export type KitsuMangaData = {
    id: Id;
    title: string;
};

export type KitsuSearchMangaTitleResponse = {
    data: KitsuMangaData[];
    links: { first: string; next: string; last: string };
    meta: number;
};
