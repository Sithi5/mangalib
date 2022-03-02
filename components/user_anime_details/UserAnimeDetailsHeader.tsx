import { FirestoreUserAnime } from 'api/FirebaseTypes';
import { kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import AppStyles, {
    DARK_GREY,
    DEFAULT_MARGIN,
    GREY,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { getKitsuItemTitle } from 'utils/kitsu';

type Props = {
    anime_id: Id;
    user_anime: FirestoreUserAnime;
    kitsu_item_data: KitsuData;
    addEpisodeToUserAnime: (number_to_add?: number) => void;
    removeEpisodeFromUserAnime: (number_to_remove?: number) => void;
    total_anime_episodes_input: string;
    setTotalAnimeEpisodesInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserAnimeDetailsHeader(props: Props) {
    const {
        anime_id,
        user_anime,
        kitsu_item_data,
        total_anime_episodes_input,
        addEpisodeToUserAnime,
        removeEpisodeFromUserAnime,
        setTotalAnimeEpisodesInput,
    } = props;

    const image_url = kitsuGetItemImage({
        id: anime_id,
        item_type: 'anime',
        format: 'small',
    });
    const total_anime_episodes = user_anime.episodes.length;
    const total_episodes_seen = user_anime.seen_episodes.length;

    if (kitsu_item_data != undefined && user_anime) {
        return (
            <View style={AppStyles.main_container}>
                <Image source={{ uri: image_url }} style={styles.item_image} />
                <View style={styles.content_main_container}>
                    <View style={styles.content_title_container}>
                        <Text style={styles.title_text}>
                            {getKitsuItemTitle({ item: kitsu_item_data })}
                        </Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.description_text}>
                            Total episodes seen: {total_episodes_seen}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.description_text}>
                                Total episodes :{' '}
                            </Text>
                            <TextInput
                                placeholder={total_anime_episodes.toString()}
                                placeholderTextColor={GREY}
                                selectionColor={GREY}
                                value={total_anime_episodes_input}
                                onChangeText={setTotalAnimeEpisodesInput}
                                onSubmitEditing={() => {
                                    if (
                                        parseInt(total_anime_episodes_input) >
                                        total_anime_episodes
                                    ) {
                                        addEpisodeToUserAnime(
                                            parseInt(
                                                total_anime_episodes_input
                                            ) - total_anime_episodes
                                        );
                                    } else {
                                        removeEpisodeFromUserAnime(
                                            total_anime_episodes -
                                                parseInt(
                                                    total_anime_episodes_input
                                                )
                                        );
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={3} //setting limit of input
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    item_image: {
        flex: 3,
        height: 150,
        margin: 5,
        backgroundColor: 'gray',
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
    title_text: {
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 30,
        color: DARK_GREY,
    },
    icon: {
        padding: 10,
    },
    text_input: {
        flex: 1,
        height: 30,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        color: DARK_GREY,
    },
    description_text: { color: GREY },
});
