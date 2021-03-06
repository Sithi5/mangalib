import type { KitsuData, KitsuItemType } from 'api/KitsuTypes';
import SearchItem, { ITEM_HEIGHT } from 'components/items/SearchItem';
import { LIGHT_GREY } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FunctionSearchAnimeArgs } from 'Screens/SearchAnimeScreen';
import { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';

const SEPARATOR_HEIGHT = 15;

export type NavigateToItemDetailsArgs = {
    item_id: Id;
    item_title: string;
};

type Props = {
    item_type: KitsuItemType;
    items_list: KitsuData[];
    last_page_reached?: boolean;
    _navigateToItemDetails: ({
        item_id,
        item_title,
    }: NavigateToItemDetailsArgs) => void;
    _searchItems?: ({}:
        | FunctionSearchMangaArgs
        | FunctionSearchAnimeArgs) => Promise<void>;
};

export default function SearchItemsList(props: Props) {
    const {
        item_type,
        items_list,
        last_page_reached = true,
        _navigateToItemDetails,
        _searchItems,
    } = props;

    return (
        <FlatList
            contentContainerStyle={styles.list_container}
            data={items_list}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
                <View style={styles.separator_container}></View>
            )}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT + SEPARATOR_HEIGHT,
                offset: (ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
                index,
            })}
            renderItem={({ item }) => (
                <SearchItem
                    item={item}
                    item_type={item_type}
                    _navigateToItemDetails={_navigateToItemDetails}
                />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (last_page_reached === false && _searchItems !== undefined) {
                    _searchItems({});
                }
            }}
        />
    );
}

const styles = StyleSheet.create({
    list_container: {
        backgroundColor: LIGHT_GREY,
        paddingTop: SEPARATOR_HEIGHT,
    },
    separator_container: {
        height: SEPARATOR_HEIGHT,
    },
});
