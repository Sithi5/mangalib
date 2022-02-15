import FadeIn from 'animations/FadeIn';
import { getItemImageFromApi } from 'api/KitsuApi';
import { KitsuMangaData } from 'api/KitsuTypes';
import AppStyles from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import getKitsuItemTitle from 'utils/GetKitsuItemTitle';

export const ANIME_ITEM_HEIGHT = 190;

type Props = {
    anime: KitsuMangaData;
    _navigateToItemDetails: ({ id }: { id: Id }) => void;
};

export default React.memo(function AnimeItem(props: Props) {
    const { anime, _navigateToItemDetails } = props;

    let anime_title = getKitsuItemTitle({ item: anime });

    const image_url = getItemImageFromApi({
        id: anime.id,
        item_type: 'anime',
        format: 'small',
    });

    return (
        <View style={AppStyles.main_container}>
            <FadeIn>
                <TouchableOpacity
                    style={styles.anime_item_container}
                    onPress={() => _navigateToItemDetails({ id: anime.id })}
                >
                    <Image
                        source={{ uri: image_url }}
                        style={styles.anime_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_top_container}>
                            <Text style={styles.title_text}>{anime_title}</Text>
                            <Text style={styles.rating_text}>
                                {anime.attributes.averageRating}
                            </Text>
                        </View>

                        <View style={styles.content_middle_container}>
                            <Text
                                style={styles.synopsis_text}
                                numberOfLines={6}
                            >
                                {anime.attributes.synopsis}
                            </Text>
                        </View>
                        <View style={styles.content_bottom_container}>
                            <Text style={styles.start_date_text}>
                                {anime.attributes.startDate}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        </View>
    );
});

const styles = StyleSheet.create({
    anime_item_container: {
        height: ANIME_ITEM_HEIGHT,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
    },
    anime_image: {
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
