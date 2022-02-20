import { Ionicons } from '@expo/vector-icons';
import { FirestoreUserManga } from 'api/FirebaseTypes';
import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import Loading from 'components/Loading';
import AppStyles, {
    BLACK,
    DEFAULT_MARGIN,
    GREY,
    ORANGE,
    RED,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
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
import { getKitsuItemTitle } from 'utils/kitsu/';
import { deepCopy } from 'utils/objects';

const window_width = Dimensions.get('window').width;

export default function LibraryMangaDetailsScreen({
    navigation,
    route,
}: LibraryStackScreenProps<'LibraryMangaDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [manga, setManga] = useState<KitsuData>();
    const id: Id = route.params.id;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const user_manga = getFirestoreUserMangaById({
        user: user,
        id: id,
    });
    const manga_index = getMangasIdsListFromFirestoreUsersMangasList({
        user_mangas_list: user.user_mangas_list,
    }).indexOf(user_manga.manga_id);

    const manga_is_in_library = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .includes(id);

    useEffect(() => {
        async function _getMangaDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: id,
                    item_type: 'manga',
                });
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

    async function _addVolumeToManga() {
        try {
            if (user.uid) {
                const last_volume = Math.max(...user_manga.volumes);
                user.user_mangas_list.indexOf(user_manga);
                let new_user_mangas_list: FirestoreUserManga[] = deepCopy({
                    source_object: user.user_mangas_list,
                });
                new_user_mangas_list[manga_index].volumes.push(last_volume + 1);
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

    async function _removeVolumeFromManga() {
        const last_volume = Math.max(...user_manga.volumes);
        if (last_volume > 1) {
            try {
                if (user.uid) {
                    if (user.user_mangas_list[manga_index].volumes.length > 1) {
                        user.user_mangas_list[manga_index].volumes.length;
                        let new_user_mangas_list: FirestoreUserManga[] =
                            deepCopy({
                                source_object: user.user_mangas_list,
                            });
                        new_user_mangas_list[manga_index].volumes.length -= 1;
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

    function _removeMangaFromLibrary() {
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
                            manga_index
                        ].possessed_volumes.includes(volume_number)
                    )
                        new_user_mangas_list[
                            manga_index
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
                            manga_index
                        ].possessed_volumes.indexOf(volume_number);
                    if (index > -1) {
                        new_user_mangas_list[
                            manga_index
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

    function _listFooter() {
        return (
            <ButtonFullBackgroundColor
                color={RED}
                onPressFunction={() => {
                    _removeMangaFromLibrary();
                }}
                text={'Remove manga from library'}
            />
        );
    }

    function _listHeader() {
        const image_url = kitsuGetItemImage({
            id: id,
            item_type: 'manga',
            format: 'small',
        });

        if (manga != undefined && user_manga) {
            return (
                <View style={AppStyles.main_container}>
                    <Image
                        source={{ uri: image_url }}
                        style={styles.item_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_title_container}>
                            <Text style={styles.title_text}>
                                {getKitsuItemTitle({ item: manga })}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity
                                onPress={async () => {
                                    _removeVolumeFromManga();
                                }}
                            >
                                <Ionicons
                                    style={styles.icon}
                                    name="remove-circle-outline"
                                    size={20}
                                    color={BLACK}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={async () => {
                                    _addVolumeToManga();
                                }}
                            >
                                <Ionicons
                                    style={styles.icon}
                                    name="add-circle-outline"
                                    size={20}
                                    color={BLACK}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }

    function _UserMangaDetails() {
        if (user.logged && manga != undefined && user_manga) {
            return (
                <FlatList
                    ListFooterComponent={_listFooter()}
                    ListHeaderComponent={_listHeader()}
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
    scrollview_container: {
        flex: 1,
    },
    item_image: {
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
    icon: {
        padding: 10,
    },
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
