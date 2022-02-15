import type { KitsuMangaData } from 'api/KitsuTypes';
import { ANIME_ITEM_HEIGHT } from 'components/AnimeItem';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { SearchAnimeScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';
import SearchItemsList from 'components/list/SearchItemsList'; // Not using the index.ts to avoid cycle import.

const SEPARATOR_HEIGHT = 5;

type Props = {
    navigation: SearchAnimeScreenNavigationProp;
    animes_list: KitsuMangaData[];
    last_page_reached?: boolean;
    _searchAnimes?: ({}: FunctionSearchMangaArgs) => Promise<void>;
};

export default function SearchAnimesList(props: Props) {
    const {
        navigation,
        animes_list,
        last_page_reached = true,
        _searchAnimes,
    } = props;

    function _navigateToAnimeDetails({ id }: { id: Id }) {
        navigation.navigate('AnimeDetails', { id });
    }

    return (
        <SearchItemsList
            item_type="anime"
            items_list={animes_list}
            last_page_reached={last_page_reached}
            _navigateToItemDetails={_navigateToAnimeDetails}
            _searchItems={_searchAnimes}
            item_height={ANIME_ITEM_HEIGHT}
        />
    );
}

const styles = StyleSheet.create({
    separator_container: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: WHITE,
    },
});
