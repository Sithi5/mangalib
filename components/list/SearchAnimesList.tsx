import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { KitsuMangaData } from 'api/KitsuTypes';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { SearchAnimeScreenNavigationProp } from 'navigations/NavigationsTypes';
import MemoizedMangaItem, { MANGA_ITEM_HEIGHT } from 'components/MangaItem';
import type { FunctionSearchMangaArgs } from 'screens/SearchMangaScreen';

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

    function _navigateToMangaDetails({ id }: { id: Id }) {
        navigation.navigate('AnimeDetails', { id });
    }

    return (
        <FlatList
            data={animes_list}
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
                    _navigateToItemDetails={_navigateToMangaDetails}
                />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (
                    last_page_reached === false &&
                    _searchAnimes !== undefined
                ) {
                    _searchAnimes({});
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
