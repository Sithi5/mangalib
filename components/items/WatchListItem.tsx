import { FadeIn } from 'animations';
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
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import getKitsuItemTitle from 'utils/kitsu/GetKitsuItemTitle';

export const WATCHLIST_ITEM_WIDTH = Dimensions.get('window').width / 3.2;
export const WATCHLIST_ITEM_HEIGHT = 200;

type Props = {
    anime: KitsuData;
    index: number;
    _navigateToAnimeDetails: (anime_id: Id, anime_title: string) => void;
};

export default React.memo(function WatchListItem(props: Props) {
    const { anime, _navigateToAnimeDetails, index } = props;

    let anime_title = getKitsuItemTitle({ item: anime });

    const image_url = kitsuGetItemImage({
        id: anime.id,
        item_type: 'anime',
        format: 'small',
    });

    return (
        <FadeIn>
            <TouchableOpacity
                style={styles.item_container}
                onPress={() => {
                    _navigateToAnimeDetails(anime.id, anime_title);
                }}
            >
                <Text adjustsFontSizeToFit={true} style={styles.title_text}>
                    {anime_title}
                </Text>
                <Image source={{ uri: image_url }} style={styles.anime_image} />
            </TouchableOpacity>
        </FadeIn>
    );
});

const styles = StyleSheet.create({
    item_container: {
        flex: 1,
        marginLeft: DEFAULT_MARGIN,
        width: WATCHLIST_ITEM_WIDTH,
        height: WATCHLIST_ITEM_HEIGHT,
        backgroundColor: WHITE,
        borderRadius: DEFAULT_RADIUS,
    },
    anime_image: {
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
