import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FadeIn from '../animations/FadeIn';
import { getMangaImageFromApi } from '../api/KitsuApi';
import { KitsuMangaData } from '../api/KitsuTypes';
import AppStyles from '../globals/AppStyles';
import { Id } from '../globals/GlobalTypes';
import getMangaTitle from './GetMangaTitle';

const WINDOWS_HEIGHT = Dimensions.get('window').height;
const WINDOWS_WIDTH = Dimensions.get('window').height;
export const HORIZONTAL_MANGA_ITEM_HEIGHT = WINDOWS_WIDTH / 2;

type Props = {
    manga: KitsuMangaData;
    _navigateToMangaDetails: (manga_id: Id) => void;
};

export default React.memo(function HorizontalMangaItem(props: Props) {
    const { manga, _navigateToMangaDetails } = props;

    let manga_title = getMangaTitle({ manga: manga });

    const image_url = getMangaImageFromApi({
        manga_id: manga.id,
        format: 'small',
    });

    return (
        <FadeIn>
            <TouchableOpacity
                style={styles.manga_item_container}
                onPress={() => _navigateToMangaDetails(manga.id)}
            >
                <View style={styles.content_top_container}>
                    <Text style={styles.title_text}>{manga_title}</Text>
                </View>

                <Image source={{ uri: image_url }} style={styles.manga_image} />
                <View style={styles.content_bottom_container}>
                    <Text style={styles.title_text}>{manga_title}</Text>
                </View>
            </TouchableOpacity>
        </FadeIn>
    );
});

const styles = StyleSheet.create({
    manga_item_container: {
        height: HORIZONTAL_MANGA_ITEM_HEIGHT,
        backgroundColor: 'lightgrey',
        flexDirection: 'column',
    },
    manga_image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'grey',
    },
    content_top_container: {
        flexDirection: 'row',
        flex: 3,
    },
    content_bottom_container: {
        flexDirection: 'row',
        flex: 3,
    },
    title_text: {
        textAlign: 'center',
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
