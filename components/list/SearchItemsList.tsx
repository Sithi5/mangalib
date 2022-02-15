import type { KitsuMangaData } from 'api/KitsuTypes';
import AnimeItem from 'components/AnimeItem';
import MangaItem from 'components/MangaItem';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';

const SEPARATOR_HEIGHT = 5;

type Props = {
    item_type: 'manga' | 'anime';
    items_list: KitsuMangaData[];
    last_page_reached?: boolean;
    item_height?: number;
    _navigateToItemDetails: ({ id }: { id: Id }) => void;
    _searchItems?: ({}: FunctionSearchMangaArgs) => Promise<void>;
};

export default function SearchItemsList(props: Props) {
    const {
        item_type,
        items_list,
        last_page_reached = true,
        _navigateToItemDetails,
        _searchItems,
        item_height,
    } = props;

    return (
        <FlatList
            data={items_list}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
                <View style={styles.separator_container}></View>
            )}
            getItemLayout={
                item_height
                    ? (data, index) => ({
                          length: item_height + SEPARATOR_HEIGHT,
                          offset: (item_height + SEPARATOR_HEIGHT) * index,
                          index,
                      })
                    : undefined
            }
            renderItem={
                item_type === 'manga'
                    ? ({ item }) => (
                          <MangaItem
                              manga={item}
                              _navigateToItemDetails={_navigateToItemDetails}
                          />
                      )
                    : ({ item }) => (
                          <AnimeItem
                              anime={item}
                              _navigateToItemDetails={_navigateToItemDetails}
                          />
                      )
            }
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
