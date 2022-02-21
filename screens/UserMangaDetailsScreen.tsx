import { FirestoreUserManga } from 'api/FirebaseTypes';
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
import {
    removeMangaFromUserMangaList,
    updateUserMangasList,
} from 'redux/UserSlice';
import { alertRemoveMangaFromLibrary } from 'utils/alerts';
import {
    getFirestoreUserMangaById,
    getMangasIdsListFromFirestoreUsersMangasList,
} from 'utils/firebase/';
import { deepCopy } from 'utils/objects';

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
    const manga_index_in_user_mangas_list =
        getMangasIdsListFromFirestoreUsersMangasList({
            user_mangas_list: user.user_mangas_list,
        }).indexOf(user_manga.manga_id);

    const manga_is_in_library = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .includes(manga_id);

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

    function removeMangaFromLibrary() {
        async function _removeUserManga() {
            try {
                if (user.logged && user.uid !== undefined) {
                    await dispatch(
                        removeMangaFromUserMangaList({
                            uid: user.uid,
                            user_manga,
                        })
                    );
                    navigation.goBack();
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
        if (manga_is_in_library) {
            alertRemoveMangaFromLibrary({
                alertYesFunction: _removeUserManga,
            });
        }
    }

    function _addOrRemoveFromUserPossessedVolumes({
        volume_number,
    }: {
        volume_number: number;
    }) {
        async function _addToUserPossessedVolumes() {
            try {
                if (user.uid) {
                    let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                        source_object: user.user_mangas_list,
                    });
                    if (
                        !new_user_mangas_list[
                            manga_index_in_user_mangas_list
                        ].possessed_volumes.includes(volume_number)
                    )
                        new_user_mangas_list[
                            manga_index_in_user_mangas_list
                        ].possessed_volumes.push(volume_number);
                    await dispatch(
                        updateUserMangasList({
                            uid: user.uid,
                            user_mangas_list: new_user_mangas_list,
                        })
                    );
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }

        async function _removeFromUserPossessedVolumes() {
            try {
                if (user.uid) {
                    let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                        source_object: user.user_mangas_list,
                    });

                    const index =
                        new_user_mangas_list[
                            manga_index_in_user_mangas_list
                        ].possessed_volumes.indexOf(volume_number);
                    if (index > -1) {
                        new_user_mangas_list[
                            manga_index_in_user_mangas_list
                        ].possessed_volumes.splice(index, 1);
                        await dispatch(
                            updateUserMangasList({
                                uid: user.uid,
                                user_mangas_list: new_user_mangas_list,
                            })
                        );
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
        if (user_manga.possessed_volumes.includes(volume_number)) {
            _removeFromUserPossessedVolumes();
        } else {
            _addToUserPossessedVolumes();
        }
    }

    async function addVolumeToUserManga() {
        try {
            if (user.uid) {
                const last_volume = Math.max(...user_manga.volumes);
                user.user_mangas_list.indexOf(user_manga);
                let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                    source_object: user.user_mangas_list,
                });
                new_user_mangas_list[
                    manga_index_in_user_mangas_list
                ].volumes.push(last_volume + 1);
                await dispatch(
                    updateUserMangasList({
                        uid: user.uid,
                        user_mangas_list: new_user_mangas_list,
                    })
                );
            }
        } catch (error: any) {
            console.error(error.message);
        }
    }

    async function removeVolumeFromUserManga() {
        const last_volume = Math.max(...user_manga.volumes);
        if (last_volume > 1) {
            try {
                if (user.uid) {
                    if (
                        user.user_mangas_list[manga_index_in_user_mangas_list]
                            .volumes.length > 1
                    ) {
                        user.user_mangas_list[manga_index_in_user_mangas_list]
                            .volumes.length;
                        let new_user_mangas_list: FirestoreUserManga[] =
                            deepCopy({
                                source_object: user.user_mangas_list,
                            });
                        const last_volume_number = Math.max.apply(
                            Math,
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].volumes
                        );

                        // Removing possessed manga
                        let index =
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].possessed_volumes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].possessed_volumes.splice(index, 1);
                        }

                        // Removing volume manga
                        index =
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].volumes.indexOf(last_volume_number);
                        if (index > -1) {
                            new_user_mangas_list[
                                manga_index_in_user_mangas_list
                            ].volumes.splice(index, 1);
                        }

                        await dispatch(
                            updateUserMangasList({
                                uid: user.uid,
                                user_mangas_list: new_user_mangas_list,
                            })
                        );
                    }
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
    }

    function _UserMangaDetails() {
        if (
            is_loading === false &&
            user.logged &&
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
                            addVolumeToUserManga: addVolumeToUserManga,
                            removeVolumeFromUserManga:
                                removeVolumeFromUserManga,
                        })}
                        ListFooterComponent={UserMangaDetailsFooter({
                            removeMangaFromLibrary: removeMangaFromLibrary,
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
                                    _addOrRemoveFromUserPossessedVolumes({
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
