import FadeIn from 'animations/FadeIn';
import { kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import {
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import React from 'react';
import { Dimensions } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import getMangaTitle from 'utils/GetKitsuItemTitle';

export const LIBRARY_ITEM_WIDTH = Dimensions.get('window').width / 3.2;
export const LIBRARY_ITEM_HEIGHT = 200;

type Props = {
    manga: KitsuData;
    index: number;
    _navigateToMangaDetails: (manga_id: Id) => void;
};

export default React.memo(function LibraryItem(props: Props) {
    const { manga, _navigateToMangaDetails, index } = props;

    let manga_title = getMangaTitle({ item: manga });

    const image_url = kitsuGetItemImage({
        id: manga.id,
        item_type: 'manga',
        format: 'small',
    });

    return (
        <FadeIn>
            <TouchableOpacity
                style={styles.item_container}
                onPress={() => _navigateToMangaDetails(manga.id)}
            >
                <Text adjustsFontSizeToFit={true} style={styles.title_text}>
                    {manga_title}
                </Text>
                <Image source={{ uri: image_url }} style={styles.manga_image} />
            </TouchableOpacity>
        </FadeIn>
    );
});

const styles = StyleSheet.create({
    item_container: {
        flex: 1,
        marginLeft: DEFAULT_MARGIN,
        width: LIBRARY_ITEM_WIDTH,
        height: LIBRARY_ITEM_HEIGHT,
        backgroundColor: WHITE,
        borderRadius: DEFAULT_RADIUS,
    },
    manga_image: {
        flex: 4,
        borderBottomLeftRadius: DEFAULT_RADIUS,
        borderBottomRightRadius: DEFAULT_RADIUS,
    },
    title_text: {
        textAlignVertical: 'center',
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: ORANGE,
        fontSize: 15,
    },
});
