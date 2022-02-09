import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FadeIn from '../animations/FadeIn';
import { getMangaImageFromApi } from '../api/KitsuApi';
import { KitsuData } from '../api/KitsuTypes';
import AppStyles from '../globals/AppStyles';
import { Id } from '../globals/GlobalTypes';

export const MANGA_ITEM_HEIGHT = 190;

type Props = {
    manga: KitsuData;
    _navigateToMangaDetails: (manga_id: Id) => void;
};

export default React.memo(function MangaItem(props: Props) {
    const { manga, _navigateToMangaDetails } = props;

    function _getMangaTitle(): string {
        const titles = manga.attributes.titles;
        if (titles.en && titles.en.length !== 0) {
            return titles.en;
        } else if (titles.en_us && titles.en_us.length !== 0) {
            return titles.en_us;
        } else if (titles.en_jp && titles.en_jp.length !== 0) {
            return titles.en_jp;
        } else if (titles.ja_jp && titles.ja_jp.length !== 0) {
            return titles.ja_jp;
        } else {
            return manga.attributes.slug;
        }
    }

    let manga_title = _getMangaTitle();

    const image_url = getMangaImageFromApi({
        manga_id: manga.id,
        format: 'small',
    });

    // function _displayFavoriteImage() {
    //     if (favorites.includes(manga.id)) {
    //         return (
    //             <Image
    //                 style={styles.favorite_icon}
    //                 source={require('../images/icon_favorite.png')}
    //             />
    //         );
    //     }
    // }

    return (
        <View style={AppStyles.main_container}>
            <FadeIn>
                <TouchableOpacity
                    style={styles.manga_item_container}
                    onPress={() => _navigateToMangaDetails(manga.id)}
                >
                    <Image
                        source={{ uri: image_url }}
                        style={styles.manga_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_top_container}>
                            {/* {_displayFavoriteImage()} */}
                            <Text style={styles.title_text}>{manga_title}</Text>
                            <Text style={styles.rating_text}>
                                {manga.attributes.averageRating}
                            </Text>
                        </View>

                        <View style={styles.content_middle_container}>
                            <Text
                                style={styles.synopsis_text}
                                numberOfLines={6}
                            >
                                {manga.attributes.synopsis}
                            </Text>
                        </View>
                        <View style={styles.content_bottom_container}>
                            <Text style={styles.start_date_text}>
                                {manga.attributes.startDate}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        </View>
    );
});

const styles = StyleSheet.create({
    manga_item_container: {
        height: MANGA_ITEM_HEIGHT,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
    },
    manga_image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'grey',
    },
    content_main_container: {
        flexDirection: 'column',
        flex: 1,
        margin: 5,
    },
    content_top_container: {
        flexDirection: 'row',
        flex: 3,
    },

    content_middle_container: { flex: 7 },
    content_bottom_container: {
        flex: 1,
    },
    title_text: {
        textAlign: 'left',
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 20,
    },
    favorite_icon: {
        width: 25,
        height: 25,
    },
    rating_text: {
        textAlign: 'right',
        fontWeight: 'bold',
        color: 'grey',
        flex: 1,
        fontSize: 25,
    },
    synopsis_text: { fontStyle: 'italic', color: 'grey' },
    start_date_text: { textAlign: 'right' },
});
