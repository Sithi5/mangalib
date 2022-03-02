import type { KitsuData } from 'api/KitsuTypes';
import SearchItemsList, {
    NavigateToItemDetailsArgs,
} from 'components/lists/SearchItemsList'; // Not using the index.ts to avoid cycle import.
import { WHITE } from 'globals/AppStyles';
import type { SearchTopTabMangaScreenNavigationProps } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';

const SEPARATOR_HEIGHT = 5;

type Props = {
    navigation: SearchTopTabMangaScreenNavigationProps;
    mangas_list: KitsuData[];
    last_page_reached?: boolean;
    _searchMangas?: ({}: FunctionSearchMangaArgs) => Promise<void>;
};

export default function SearchMangasList(props: Props) {
    const {
        navigation,
        mangas_list,
        last_page_reached = true,
        _searchMangas,
    } = props;

    const item_type = 'manga';

    function _navigateToItemDetails({
        item_id,
        item_title,
    }: NavigateToItemDetailsArgs) {
        navigation.navigate('ItemDetails', {
            item_id: item_id,
            item_type: item_type,
            item_title: item_title,
        });
    }

    return (
        <SearchItemsList
            item_type={item_type}
            items_list={mangas_list}
            last_page_reached={last_page_reached}
            _navigateToItemDetails={_navigateToItemDetails}
            _searchItems={_searchMangas}
        />
    );
}

const styles = StyleSheet.create({
    separator_container: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: WHITE,
    },
});
