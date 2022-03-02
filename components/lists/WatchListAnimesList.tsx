import type { KitsuData } from 'api/KitsuTypes';
import { WatchListItem } from 'components/items';
import AppStyles, { DEFAULT_MARGIN } from 'globals/AppStyles';
import type { Id } from 'globals/GlobalTypes';
import type { WatchListScreenNavigationProp } from 'navigations/NavigationsTypes';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Props = {
    navigation: WatchListScreenNavigationProp;
    animes_list: KitsuData[];
};

export default function WatchListAnimesList(props: Props) {
    const { navigation, animes_list } = props;

    function _navigateToWatchListAnimeDetails(
        anime_id: Id,
        anime_title: string
    ) {
        navigation.navigate('UserAnimeDetails', {
            anime_id: anime_id,
            anime_title: anime_title,
        });
    }

    if (animes_list.length > 0) {
        return (
            <View style={AppStyles.main_container}>
                <FlatList
                    data={animes_list}
                    horizontal={false}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    ItemSeparatorComponent={() => (
                        <View style={styles.separator_container}></View>
                    )}
                    renderItem={({ item, index }) => (
                        <WatchListItem
                            anime={item}
                            index={index}
                            _navigateToAnimeDetails={
                                _navigateToWatchListAnimeDetails
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
                    <Text>Nothing in your watchlist yet.</Text>
                    <Text>You can add some anime from the search screen.</Text>
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
