import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MangaItem from './MangaItem';

// Types
import type { Id } from '../globals/GlobalTypes';
import type { KitsuData } from '../api/KitsuTypes';
import type { SearchStackScreenProps } from '../navigations/NavigationsTypes';
import type { FunctionSearchMangaArgs } from './SearchScreen';

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
            renderItem={({ item }) => (
                <View style={styles.movie_items_container}>
                    <MangaItem
                        manga={item}
                        _navigateToMangaDetails={_navigateToMangaDetails}
                    />
                </View>
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
    movie_items_container: {
        backgroundColor: 'white',
        paddingTop: 5,
        paddingLeft: 5,
    },
});
