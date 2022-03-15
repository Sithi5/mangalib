import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData, KitsuItemType } from 'api/KitsuTypes';
import {
    ButtonBorderColor,
    ButtonFullBackgroundColor,
} from 'components/buttons';
import {
    BodyContainerUserItemDetails,
    TopContainerItemDetailsContent,
} from 'components/item_details_screen_components';
import Loading from 'components/Loading';
import { ModalUserItem } from 'components/modals';
import { ItemDetailsScreenNavigationHeader } from 'components/navigations_headers';
import StatusBar from 'components/StatusBar';
import { BlurView } from 'expo-blur';
import AppStyles, {
    BLACK,
    BLUR_INTENSITY,
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    GREY,
    ORANGE,
    RED,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { SearchStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import {
    getFirestoreUserAnimeById,
    getFirestoreUserMangaById,
} from 'utils/firebase';
import getKitsuItemTitle from 'utils/kitsu/GetKitsuItemTitle';
import { removeItemFromUser } from 'utils/users';
import addItemToUser from 'utils/users/AddItemToUser';

const RATING_BUBBLE_CONTAINER_SIZE = 50;
const RATING_BUBBLE_CONTAINER_INSIDE_SIZE = RATING_BUBBLE_CONTAINER_SIZE - 5;
const TOP_CONTAINER_ITEM_IMAGE_HEIGHT = 180;
const TOP_CONTAINER_ITEM_IMAGE_WIDTH = TOP_CONTAINER_ITEM_IMAGE_HEIGHT * 0.75;

export default function ItemDetailsScreen({
    navigation,
    route,
}: SearchStackScreenProps<'ItemDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [show_library_modal, setShowLibraryModal] = useState(false);
    const [item, setItem] = useState<KitsuData>();
    const [header_z_index, setHeaderZIndex] = useState(0);
    const scroll = useRef(new Animated.Value(0)).current;
    const item_id: Id = route.params.item_id;
    const item_type: KitsuItemType = route.params.item_type;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    let image_url = useRef('');
    let item_title = item ? getKitsuItemTitle({ item: item }) : '';

    function updateHeaderZIndex(new_z_index: number) {
        setHeaderZIndex(new_z_index);
    }

    useEffect(() => {
        async function _getItemDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: item_id,
                    item_type: item_type,
                });
                if (response) {
                    setItem(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                image_url.current = kitsuGetItemImage({
                    id: item_id,
                    item_type: item_type,
                    format: 'small',
                });
                setLoading(false);
            }
        }
        _getItemDetails();
    }, [item_id]);

    function _displayAddOrRemoveFromLibrary() {
        async function _addItemToUser() {
            if (user.uid !== undefined && item) {
                try {
                    addItemToUser({
                        item_type: item_type,
                        item: item,
                        dispatch: dispatch,
                        user: user,
                        item_title: item_title,
                    });
                } catch (error: any) {
                    console.error(error.message);
                }
            }
        }

        async function _removeItemFromUser() {
            if (user.uid !== undefined && item) {
                try {
                    removeItemFromUser({
                        item_type: item_type,
                        item_id: item_id,
                        dispatch: dispatch,
                        user: user,
                    });
                } catch (error: any) {
                    console.error(error.message);
                }
            }
        }

        if (item && user.logged) {
            const is_in_library =
                item_type === 'manga'
                    ? user.user_mangas_list.includes(
                          getFirestoreUserMangaById({
                              user: user,
                              id: item.id,
                          })
                      )
                    : user.user_animes_list.includes(
                          getFirestoreUserAnimeById({
                              user: user,
                              id: item.id,
                          })
                      );
            return (
                <View style={styles.remove_or_add_button}>
                    {is_in_library ? (
                        <ButtonFullBackgroundColor
                            color={RED}
                            text={
                                item_type === 'manga'
                                    ? 'Remove from library'
                                    : 'Remove from Watchlist'
                            }
                            onPressFunction={() => {
                                _removeItemFromUser();
                            }}
                        />
                    ) : (
                        <ButtonBorderColor
                            color={ORANGE}
                            text={
                                item_type === 'manga'
                                    ? 'Add to library'
                                    : 'Add to Watchlist'
                            }
                            onPressFunction={() => {
                                _addItemToUser();
                            }}
                        />
                    )}
                </View>
            );
        }
    }

    function _ItemDetails() {
        if (item != undefined) {
            const item_rating_text = item.attributes.averageRating
                ? (parseInt(item.attributes.averageRating) / 10).toString()
                : '';

            return (
                <Animated.ScrollView
                    style={styles.scrollview_container}
                    stickyHeaderIndices={[0]}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scroll } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                >
                    <Animated.View
                        style={{
                            zIndex: header_z_index, // works on ios
                            elevation: header_z_index, // works on android
                        }}
                    >
                        <ItemDetailsScreenNavigationHeader
                            item_title={item_title}
                            image_url={image_url.current}
                            navigation={navigation}
                            scroll={scroll}
                            updateHeaderZIndex={updateHeaderZIndex}
                        />
                    </Animated.View>

                    {item_rating_text ? (
                        <View style={styles.rating_bubble_container}>
                            <View style={styles.rating_bubble_inside}>
                                <Text style={styles.rating_bubble_text}>
                                    {item_rating_text}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={styles.rating_bubble_container_hidden}
                        ></View>
                    )}

                    <View style={styles.content_main_container}>
                        <View style={styles.content_top_container}>
                            <Image
                                source={
                                    image_url.current !== ''
                                        ? { uri: image_url.current }
                                        : require('images/default_image.png')
                                }
                                style={styles.content_top_container_item_image}
                            />
                            <TopContainerItemDetailsContent
                                item={item}
                                item_type={item_type}
                            ></TopContainerItemDetailsContent>
                        </View>
                        <View style={styles.content_body_container}>
                            <BodyContainerUserItemDetails
                                item={item}
                                item_type={item_type}
                                user={user}
                                setShowLibraryModal={setShowLibraryModal}
                            ></BodyContainerUserItemDetails>
                            {user.logged ? (
                                <ModalUserItem
                                    show_library_modal={show_library_modal}
                                    setShowLibraryModal={setShowLibraryModal}
                                    item={item}
                                    item_type={item_type}
                                    user={user}
                                ></ModalUserItem>
                            ) : null}

                            <Text style={styles.content_body_text}>
                                Overview:
                            </Text>
                            <View style={styles.content_overview_container}>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.content_bottom_container}></View>
                        {_displayAddOrRemoveFromLibrary()}
                    </View>
                    <BlurView
                        style={[
                            styles.blur_container,
                            {
                                zIndex: show_library_modal ? 1 : -1,
                                elevation: show_library_modal ? 1 : -1,
                            },
                        ]}
                        tint="dark"
                        intensity={show_library_modal ? BLUR_INTENSITY : 0}
                    />
                </Animated.ScrollView>
            );
        }
    }

    return (
        <View style={AppStyles.main_container}>
            <StatusBar />
            <Loading is_loading={is_loading} />
            {_ItemDetails()}
        </View>
    );
}

const styles = StyleSheet.create({
    blur_container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    scrollview_container: {
        flex: 1,
    },

    navigation_header_container: {
        flex: 1,
    },
    content_main_container: {
        flex: 1,
        marginTop: -(RATING_BUBBLE_CONTAINER_SIZE / 3),
    },
    content_top_container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderRadius: DEFAULT_RADIUS,
    },
    content_top_container_item_image: {
        height: TOP_CONTAINER_ITEM_IMAGE_HEIGHT,
        width: TOP_CONTAINER_ITEM_IMAGE_WIDTH,
        margin: DEFAULT_MARGIN,
        borderRadius: 10,
        backgroundColor: GREY,
    },

    content_body_container: {
        flex: 3,
        margin: 5,
    },
    content_body_text: {
        margin: 5,
        fontFamily: 'Rubik-Bold',
        fontSize: 17,
        color: BLACK,
    },
    content_overview_container: {
        flex: 1,
        margin: 5,
    },
    content_bottom_container: {
        flex: 1,
        margin: 5,
    },
    overview_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: GREY,
        fontFamily: 'Rubik-LightItalic',
    },

    rating_bubble_container: {
        marginTop: -(RATING_BUBBLE_CONTAINER_SIZE / 2),
        alignSelf: 'flex-end',
        marginRight: '10%',
        width: RATING_BUBBLE_CONTAINER_SIZE,
        height: RATING_BUBBLE_CONTAINER_SIZE,
        borderRadius: RATING_BUBBLE_CONTAINER_SIZE / 2,
        backgroundColor: ORANGE,
        zIndex: 1, // works on ios
        elevation: 1, // works on android
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating_bubble_container_hidden: {
        marginTop: -(RATING_BUBBLE_CONTAINER_SIZE / 2),
        alignSelf: 'flex-end',
        marginRight: '10%',
        width: RATING_BUBBLE_CONTAINER_SIZE,
        height: RATING_BUBBLE_CONTAINER_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rating_bubble_inside: {
        width: RATING_BUBBLE_CONTAINER_INSIDE_SIZE,
        height: RATING_BUBBLE_CONTAINER_INSIDE_SIZE,
        borderRadius: RATING_BUBBLE_CONTAINER_INSIDE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    rating_bubble_text: {
        fontSize: 20,
        fontFamily: 'Rubik-Bold',
        color: ORANGE,
    },
    bottom_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        fontFamily: 'Rubik-Bold',
        color: GREY,
    },
    remove_or_add_button: {
        flex: 1,
        width: '60%',
        alignSelf: 'center',
    },
});
