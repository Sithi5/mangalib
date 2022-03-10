import { kitsuGetItemDetails } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import Loading from 'components/Loading';
import {
    UserAnimeDetailsFooter,
    UserAnimeDetailsHeader,
} from 'components/user_anime_details';
import AppStyles, {
    DARK_GREY,
    DEFAULT_MARGIN,
    ORANGE,
    WHITE,
    WINDOW_WIDTH,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { WatchListStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { getFirestoreUserAnimeById } from 'utils/firebase';
import {
    addOrRemoveFromUserSeenEpisodes,
    removeItemFromUser,
} from 'utils/users';
import addEpisodesToUserAnime from 'utils/users/AddEpisodesToUserAnime';
import removeEpisodesFromUserAnime from 'utils/users/RemoveEpisodesFromUserAnime';

export default function UserAnimeDetailsScreen({
    navigation,
    route,
}: WatchListStackScreenProps<'UserAnimeDetails'>) {
    const anime_id: Id = route.params.anime_id;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [kitsu_item_data, setKitsuAnimeData] = useState<KitsuData>();
    const [is_loading, setLoading] = useState(true);
    const [total_anime_episodes_input, setTotalAnimeEpisodesInput] =
        useState('');

    let user_anime = getFirestoreUserAnimeById({
        user: user,
        id: anime_id,
    });
    useEffect(() => {
        if (!user_anime) {
            navigation.goBack(); // The anime no longer exist on the user library.
        }
    });
    useEffect(() => {
        async function _getKitsuAnimeDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: anime_id,
                    item_type: 'anime',
                });
                if (response) {
                    setKitsuAnimeData(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getKitsuAnimeDetails();
    }, [anime_id]);

    async function callRemoveItemFromUser() {
        try {
            await removeItemFromUser({
                user: user,
                item_id: anime_id,
                item_type: 'anime',
                dispatch: dispatch,
            });
        } catch (error: any) {
            console.error(error);
        }
    }

    function callAddOrRemoveFromUserSeenEpisodes({
        episode_number,
    }: {
        episode_number: number;
    }) {
        addOrRemoveFromUserSeenEpisodes({
            user: user,
            user_anime: user_anime,
            episode_number: episode_number,
            dispatch: dispatch,
        });
    }

    function callRemoveEpisodeFromUserAnime(number_to_remove?: number) {
        removeEpisodesFromUserAnime({
            user: user,
            user_anime: user_anime,
            number_to_remove: number_to_remove,
            dispatch: dispatch,
        });
    }

    function callAddEpisodeToUserAnime(number_to_add?: number) {
        addEpisodesToUserAnime({
            user: user,
            user_anime: user_anime,
            number_to_add: number_to_add,
            dispatch: dispatch,
        });
    }

    function _UserAnimeDetails() {
        if (is_loading === false && kitsu_item_data && user_anime) {
            return (
                <View style={AppStyles.main_container}>
                    <FlatList
                        ListHeaderComponent={UserAnimeDetailsHeader({
                            kitsu_item_data: kitsu_item_data,
                            anime_id: anime_id,
                            user_anime: user_anime,
                            addEpisodeToUserAnime: callAddEpisodeToUserAnime,
                            removeEpisodeFromUserAnime:
                                callRemoveEpisodeFromUserAnime,
                            total_anime_episodes_input:
                                total_anime_episodes_input,
                            setTotalAnimeEpisodesInput:
                                setTotalAnimeEpisodesInput,
                        })}
                        ListFooterComponent={UserAnimeDetailsFooter({
                            removeAnimeFromWatchList: callRemoveItemFromUser,
                        })}
                        data={user_anime.episodes}
                        horizontal={false}
                        keyExtractor={(item) => item.toString()}
                        numColumns={8}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator_container}></View>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    callAddOrRemoveFromUserSeenEpisodes({
                                        episode_number: item,
                                    });
                                }}
                                style={[
                                    styles.volume_bubble,
                                    {
                                        backgroundColor:
                                            user_anime.seen_episodes.includes(
                                                item
                                            )
                                                ? ORANGE
                                                : WHITE,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: user_anime.seen_episodes.includes(
                                            item
                                        )
                                            ? WHITE
                                            : DARK_GREY,
                                    }}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            );
        }
    }
    return (
        <View style={AppStyles.main_container}>
            <Loading is_loading={is_loading} />
            {_UserAnimeDetails()}
        </View>
    );
}

const volume_bubble_size = WINDOW_WIDTH / 10;

const styles = StyleSheet.create({
    separator_container: {
        height: DEFAULT_MARGIN,
    },
    volume_bubble: {
        margin: DEFAULT_MARGIN,
        height: volume_bubble_size,
        width: volume_bubble_size,
        borderRadius: volume_bubble_size / 2,
        backgroundColor: WHITE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
