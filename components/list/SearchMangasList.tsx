import type { KitsuData } from 'api/KitsuTypes';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { SearchMangaScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet } from 'react-native';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';
import SearchItemsList, {
    NavigateToItemDetailsArgs,
} from 'components/list/SearchItemsList'; // Not using the index.ts to avoid cycle import.

const SEPARATOR_HEIGHT = 5;

type Props = {
    navigation: SearchMangaScreenNavigationProp;
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

    function _navigateToMangaDetails({ id }: NavigateToItemDetailsArgs) {
        navigation.navigate('MangaDetails', { id });
    }

    return (
        <SearchItemsList
            item_type="manga"
            items_list={mangas_list}
            last_page_reached={last_page_reached}
            _navigateToItemDetails={_navigateToMangaDetails}
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
