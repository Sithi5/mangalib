import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import Loading from 'components/Loading';
import AppStyles, { RED } from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { removeMangaFromUserLibrary } from 'redux/UserSlice';
import getKitsuItemTitle from 'utils/GetKitsuItemTitle';

export default function LibraryMangaDetailsScreen({
    navigation,
    route,
}: LibraryStackScreenProps<'LibraryMangaDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [item, setItem] = useState<KitsuData>();
    const id: Id = route.params.id;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

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

    function _removeMangaFromLibrary() {
        async function _asyncRemoveMangaFromLibrary() {
            try {
                if (user.logged && user.uid !== undefined) {
                    await dispatch(
                        removeMangaFromUserLibrary({
                            uid: user.uid,
                            manga_id: id,
                        })
                    );
                    navigation.goBack();
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }
        const manga_is_in_library = user.mangas_list.includes(id);
        if (manga_is_in_library) {
            Alert.alert(
                'Remove manga from library',
                'Are you sure you want to remove this manga from your library?',
                [
                    {
                        text: 'No',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: _asyncRemoveMangaFromLibrary,
                    },
                ]
            );
        }
    }

    function _ItemDetails() {
        if (item != undefined) {
            const image_url = kitsuGetItemImage({
                id: id,
                item_type: 'manga',
                format: 'small',
            });

            return (
                <ScrollView style={styles.scrollview_container}>
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
                        <ButtonFullBackgroundColor
                            color={RED}
                            onPressFunction={async () => {
                                await _removeMangaFromLibrary();
                            }}
                            text={'Remove manga from library'}
                        />
                    </View>
                </ScrollView>
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
});
