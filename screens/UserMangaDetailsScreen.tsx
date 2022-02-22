import { kitsuGetItemDetails } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import Loading from 'components/Loading';
import {
    UserMangaDetailsFooter,
    UserMangaDetailsHeader,
} from 'components/users';
import AppStyles, {
    BLACK,
    DEFAULT_MARGIN,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { getFirestoreUserMangaById } from 'utils/firebase/';
import {
    addOrRemoveFromUserPossessedVolumes,
    addVolumeToUserManga,
    removeMangaFromUser,
    removeVolumeFromUserManga,
} from 'utils/users';

const window_width = Dimensions.get('window').width;

export default function UserMangaDetailsScreen({
    navigation,
    route,
}: LibraryStackScreenProps<'UserMangaDetails'>) {
    const manga_id: Id = route.params.manga_id;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [kitsu_manga_data, setKitsuMangaData] = useState<KitsuData>();
    const [is_loading, setLoading] = useState(true);

    const user_manga = getFirestoreUserMangaById({
        user: user,
        id: manga_id,
    });
    useEffect(() => {
        if (!user_manga) {
            navigation.goBack(); // The manga no longer exist on the user library.
        }
    });
    useEffect(() => {
        async function _getKitsuMangaDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: manga_id,
                    item_type: 'manga',
                });
                if (response) {
                    setKitsuMangaData(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getKitsuMangaDetails();
    }, [manga_id]);

    function callRemoveMangaFromUserLibrary() {
        const removed = removeMangaFromUser({
            user: user,
            user_manga: user_manga,
            manga_id: manga_id,
            dispatch: dispatch,
        });
    }

    function callAddOrRemoveFromUserPossessedVolumes({
        volume_number,
    }: {
        volume_number: number;
    }) {
        addOrRemoveFromUserPossessedVolumes({
            user: user,
            user_manga: user_manga,
            volume_number: volume_number,
            dispatch: dispatch,
        });
    }

    function callRemoveVolumeFromUserManga() {
        removeVolumeFromUserManga({
            user: user,
            user_manga: user_manga,
            dispatch: dispatch,
        });
    }

    function callAddVolumeToUserManga() {
        addVolumeToUserManga({
            user: user,
            user_manga: user_manga,
            dispatch: dispatch,
        });
    }

    function _UserMangaDetails() {
        if (
            is_loading === false &&
            kitsu_manga_data != undefined &&
            user_manga
        ) {
            return (
                <View style={AppStyles.main_container}>
                    <FlatList
                        ListHeaderComponent={UserMangaDetailsHeader({
                            kitsu_manga_data: kitsu_manga_data,
                            manga_id: manga_id,
                            user_manga: user_manga,
                            addVolumeToUserManga: callAddVolumeToUserManga,
                            removeVolumeFromUserManga:
                                callRemoveVolumeFromUserManga,
                        })}
                        ListFooterComponent={UserMangaDetailsFooter({
                            removeMangaFromLibrary:
                                callRemoveMangaFromUserLibrary,
                        })}
                        data={user_manga.volumes}
                        horizontal={false}
                        keyExtractor={(item) => item.toString()}
                        numColumns={8}
                        ItemSeparatorComponent={() => (
                            <View style={styles.separator_container}></View>
                        )}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    callAddOrRemoveFromUserPossessedVolumes({
                                        volume_number: item,
                                    });
                                }}
                                style={[
                                    styles.volume_bubble,
                                    {
                                        backgroundColor:
                                            user_manga.possessed_volumes.includes(
                                                item
                                            )
                                                ? ORANGE
                                                : WHITE,
                                    },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: user_manga.possessed_volumes.includes(
                                            item
                                        )
                                            ? WHITE
                                            : BLACK,
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
            {_UserMangaDetails()}
        </View>
    );
}

const volume_bubble_size = window_width / 10;

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
