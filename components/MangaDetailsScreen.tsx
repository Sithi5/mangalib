import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getMangaDetailsFromApi, getMangaImageFromApi } from '../api/KitsuApi';
import { KitsuMangaData } from '../api/KitsuTypes';
import AppStyles from '../globals/AppStyles';
import { Id } from '../globals/GlobalTypes';
import { SearchStackScreenProps } from '../navigations/NavigationsTypes';
import DisplayLoading from './DisplayLoading';
import getMangaTitle from './GetMangaTitle';

export default function MangaDetailsScreen({
    route,
}: SearchStackScreenProps<'MangaDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [manga, setManga] = useState<KitsuMangaData>();
    const id: Id = route.params.id;

    useEffect(() => {
        async function _getMangaDetails() {
            try {
                const response = await getMangaDetailsFromApi({ manga_id: id });
                if (response) {
                    setManga(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getMangaDetails();
    }, [id]);

    function _displayMangaDetails() {
        if (manga != undefined) {
            const image_url = getMangaImageFromApi({
                manga_id: id,
                format: 'small',
            });

            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        source={{ uri: image_url }}
                        style={styles.manga_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_title_container}>
                            <Text style={styles.title_text}>
                                {getMangaTitle({ manga: manga })}
                            </Text>
                            {/* <TouchableOpacity
                                onPress={() => {
                                    dispatch(updateFavorites(id));
                                }}
                            >
                                {_displayFavoriteImage()}
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.content_overview_container}>
                            <Text style={styles.overview_text}>
                                {manga.attributes.synopsis}
                            </Text>
                        </View>
                        <View style={styles.content_bottom_container}>
                            {/* <Text style={styles.bottom_text}>
                                Released: {_displayDate()}
                            </Text> */}
                            <Text style={styles.bottom_text}>
                                Vote: {manga.attributes.averageRating} / 100
                            </Text>
                            {/* <Text style={styles.bottom_text}>
                                Budget: {_displayBudget()}
                            </Text>
                            <Text style={styles.bottom_text}>
                                Genres: {_displayGenres()}
                            </Text>
                            <Text style={styles.bottom_text}>
                                Production companies:{' '}
                                {_displayProductionCompanies()}
                            </Text>
                            {_displayFloatingActionButton()} */}
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }

    return (
        <View style={AppStyles.main_container}>
            <DisplayLoading is_loading={is_loading} />
            {_displayMangaDetails()}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollview_container: {
        flex: 1,
    },
    manga_image: {
        flex: 3,
        height: 150,
        margin: 5,
        backgroundColor: 'gray',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_main_container: {
        flex: 3,
        margin: 5,
    },
    content_title_container: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    content_overview_container: {
        flex: 1,
        margin: 5,
    },
    content_bottom_container: {
        flex: 1,
        margin: 5,
    },
    title_text: {
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    overview_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: 'grey',
        fontStyle: 'italic',
    },
    bottom_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: 'dimgrey',
    },

    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    share_image: {
        width: 30,
        height: 30,
    },
});
