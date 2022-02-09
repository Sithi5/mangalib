import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import type { KitsuData } from '../api/KitsuTypes';
import { WHITE } from '../globals/AppStyles';
import type { Id } from '../globals/GlobalTypes';
import type { SearchStackScreenProps } from '../navigations/NavigationsTypes';
import MemoizedMangaItem, { MANGA_ITEM_HEIGHT } from './MangaItem';
import type { FunctionSearchMangaArgs } from './SearchScreen';

const SEPARATOR_HEIGHT = 5;

type Props = {
    mangas_list: KitsuData[];
    last_page_reached: boolean;
    _searchMangas: ({}: FunctionSearchMangaArgs) => Promise<void>;
};

export default function DisplayMangasList(props: Props) {
    const { mangas_list, last_page_reached = true, _searchMangas } = props;

    const navigation =
        useNavigation<SearchStackScreenProps<'Search'>>().navigation;

    function _navigateToMangaDetails(id: Id) {
        // navigation.navigate();
    }

    return (
        <FlatList
            data={mangas_list}
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
                    _navigateToMangaDetails={_navigateToMangaDetails}
                />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if (
                    last_page_reached === false &&
                    _searchMangas !== undefined
                ) {
                    _searchMangas({});
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
