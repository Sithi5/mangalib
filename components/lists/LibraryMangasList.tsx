import type { KitsuData } from 'api/KitsuTypes';
import { LibraryItem } from 'components/items';
import AppStyles, { DEFAULT_MARGIN } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { LibraryScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Props = {
    navigation: LibraryScreenNavigationProp;
    mangas_list: KitsuData[];
};

export default function LibraryMangasList(props: Props) {
    const { navigation, mangas_list } = props;

    function _navigateToLibraryMangaDetails(manga_id: Id, manga_title: string) {
        navigation.navigate('UserMangaDetails', {
            manga_id: manga_id,
            manga_title: manga_title,
        });
    }

    if (mangas_list.length > 0) {
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
                            _navigateToMangaDetails={
                                _navigateToLibraryMangaDetails
                            }
                        />
                    )}
                />
            </View>
        );
    } else {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View>
                    <Text>Nothing in your library yet.</Text>
                    <Text>You can add some manga from the search screen.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    separator_container: {
        height: DEFAULT_MARGIN,
    },
});
