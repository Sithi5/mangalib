import { KitsuData } from 'api/KitsuTypes';

type Args = {
    item: KitsuData;
};

export default function getKitsuItemTitle({ item }: Args): string {
    const titles = item.attributes.titles;
    if (titles) {
        if (titles.en && titles.en.length !== 0) {
            return titles.en;
        } else if (titles.en_us && titles.en_us.length !== 0) {
            return titles.en_us;
        } else if (titles.en_jp && titles.en_jp.length !== 0) {
            return titles.en_jp;
        } else if (titles.ja_jp && titles.ja_jp.length !== 0) {
            return titles.ja_jp;
        } else if (item.attributes && item.attributes.slug) {
            return item.attributes.slug;
        }
    }
    return '';
}
