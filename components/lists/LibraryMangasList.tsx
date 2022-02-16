import type { KitsuData } from 'api/KitsuTypes';
import { WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { LibraryScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LibraryItem from '../LibraryItem';

const SEPARATOR_WIDTH = 5;

type Props = {
    navigation: LibraryScreenNavigationProp;
    mangas_list: KitsuData[];
};

export default function LibraryMangasList(props: Props) {
    const { navigation, mangas_list } = props;

    function _navigateToMangaDetails(id: Id) {
        navigation.navigate('ItemDetails', { id: id, item_type: 'manga' });
    }

    return (
        <View>
            <FlatList
                data={mangas_list}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator_container}></View>
                )}
                renderItem={({ item }) => (
                    <LibraryItem
                        manga={item}
                        _navigateToMangaDetails={_navigateToMangaDetails}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    separator_container: {
        width: SEPARATOR_WIDTH,
        backgroundColor: WHITE,
    },
});
