import type { KitsuData } from 'api/KitsuTypes';
import AppStyles, { DEFAULT_MARGIN, WHITE } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { LibraryScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import LibraryItem from '../LibraryItem';

const SEPARATOR_HEIGHT = 15;

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
        <View style={AppStyles.main_container}>
            <FlatList
                data={mangas_list}
                horizontal={false}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator_container}></View>
                )}
                renderItem={({ item, index }) => (
                    <LibraryItem
                        manga={item}
                        index={index}
                        _navigateToMangaDetails={_navigateToMangaDetails}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    separator_container: {
        height: DEFAULT_MARGIN,
    },
});
