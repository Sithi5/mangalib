import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { KitsuMangaData } from 'api/KitsuTypes';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import MemoizedMangaItem, { MANGA_ITEM_HEIGHT } from 'components/MangaItem';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';

const SEPARATOR_HEIGHT = 5;

type Props = {
    items_list: KitsuMangaData[];
    last_page_reached?: boolean;
    _navigateToItemDetails: ({ id }: { id: Id }) => void;
    _searchItems?: ({}: FunctionSearchMangaArgs) => Promise<void>;
};

export default function SearchItemsList(props: Props) {
    const {
        items_list,
        last_page_reached = true,
        _navigateToItemDetails,
        _searchItems,
    } = props;

    return (
        <FlatList
            data={items_list}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
                <View style={styles.separator_container}></View>
            )}
            getItemLayout={(data, index) => ({
                length: MANGA_ITEM_HEIGHT + SEPARATOR_HEIGHT,
                offset: (MANGA_ITEM_HEIGHT + SEPARATOR_HEIGHT) * index,
                index,
            })}
            renderItem={({ item }) => (
                <MemoizedMangaItem
                    manga={item}
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
    separator_container: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: WHITE,
    },
});
