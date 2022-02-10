import { KitsuMangaData } from '../api/KitsuTypes';

type Args = {
    manga: KitsuMangaData;
};

export default function getMangaTitle({ manga }: Args): string {
    const titles = manga.attributes.titles;
    if (titles.en && titles.en.length !== 0) {
        return titles.en;
    } else if (titles.en_us && titles.en_us.length !== 0) {
        return titles.en_us;
    } else if (titles.en_jp && titles.en_jp.length !== 0) {
        return titles.en_jp;
    } else if (titles.ja_jp && titles.ja_jp.length !== 0) {
        return titles.ja_jp;
    } else {
        return manga.attributes.slug;
    }
}
