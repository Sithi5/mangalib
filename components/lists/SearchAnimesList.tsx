import type { KitsuData } from 'api/KitsuTypes';
import SearchItemsList, {
    NavigateToItemDetailsArgs,
} from 'components/lists/SearchItemsList';
import { WHITE } from 'globals/AppStyles';
import type { SearchTopTabAnimeScreenNavigationProps } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FunctionSearchAnimeArgs } from 'Screens/SearchAnimeScreen';

const SEPARATOR_HEIGHT = 5;

type Props = {
    navigation: SearchTopTabAnimeScreenNavigationProps;
    animes_list: KitsuData[];
    last_page_reached?: boolean;
    _searchAnimes?: ({}: FunctionSearchAnimeArgs) => Promise<void>;
};

export default function SearchAnimesList(props: Props) {
    const {
        navigation,
        animes_list,
        last_page_reached = true,
        _searchAnimes,
    } = props;

    const item_type = 'anime';

    function _navigateToItemDetails({
        item_id,
        item_title,
    }: NavigateToItemDetailsArgs) {
        navigation.navigate('ItemDetails', {
            item_id,
            item_type: item_type,
            item_title: item_title,
        });
    }

    return (
        <SearchItemsList
            item_type={item_type}
            items_list={animes_list}
            last_page_reached={last_page_reached}
            _navigateToItemDetails={_navigateToItemDetails}
            _searchItems={_searchAnimes}
        />
    );
}

const styles = StyleSheet.create({
    separator_container: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: WHITE,
    },
});
