import { Ionicons } from '@expo/vector-icons';
import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import UserMangaVolumesList from 'components/lists/UserMangaVolumesList';
import Loading from 'components/Loading';
import AppStyles, { BLACK, RED } from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import {
    addVolumeToUserMangaVolumes,
    removeMangaFromUserLibrary,
    removeVolumeFromUserMangaVolumes,
} from 'redux/UserSlice';
import { alertRemoveMangaFromLibrary } from 'utils/alerts';
import { getFirestoreUserMangaById } from 'utils/firebase/';
import { getKitsuItemTitle } from 'utils/kitsu/';

export default function LibraryMangaDetailsScreen({
    navigation,
    route,
}: LibraryStackScreenProps<'LibraryMangaDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [item, setItem] = useState<KitsuData>();
    const id: Id = route.params.id;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const user_manga = getFirestoreUserMangaById({
        user: user,
        id: id,
    });
    const manga_is_in_library = user.user_mangas_list
        .map((user_manga) => {
            return user_manga.manga_id;
        })
        .includes(id);

    useEffect(() => {
        async function _getItemDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: id,
                    item_type: 'manga',
                });
                if (response) {
                    setItem(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getItemDetails();
    }, [id]);

    async function _addVolumeToManga() {
        try {
            const last_volume = Math.max(...user_manga.volumes);
            await dispatch(
                addVolumeToUserMangaVolumes({
                    user_manga: user_manga,
                    volume_number: last_volume + 1,
                })
            );
        } catch (error: any) {
            console.error(error.message);
        }
    }

    async function _removeVolumeFromManga() {
        const last_volume = Math.max(...user_manga.volumes);
        if (last_volume > 1) {
            try {
                await dispatch(
                    removeVolumeFromUserMangaVolumes({
                        user_manga: user_manga,
                        volume_number: last_volume,
                    })
                );
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
                        removeMangaFromUserLibrary({
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

    function _ItemDetails() {
        if (item != undefined && user_manga) {
            const image_url = kitsuGetItemImage({
                id: id,
                item_type: 'manga',
                format: 'small',
            });

            return (
                <View style={styles.scrollview_container}>
                    <Image
                        source={{ uri: image_url }}
                        style={styles.item_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_title_container}>
                            <Text style={styles.title_text}>
                                {getKitsuItemTitle({ item: item })}
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

                        <UserMangaVolumesList user_manga={user_manga} />
                        <ButtonFullBackgroundColor
                            color={RED}
                            onPressFunction={() => {
                                _removeMangaFromLibrary();
                            }}
                            text={'Remove manga from library'}
                        />
                    </View>
                </View>
            );
        }
    }

    return (
        <View style={AppStyles.main_container}>
            <Loading is_loading={is_loading} />
            {_ItemDetails()}
        </View>
    );
}

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
});
