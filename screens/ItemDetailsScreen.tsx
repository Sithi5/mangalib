import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData, KitsuItemType } from 'api/KitsuTypes';
import { ButtonBorderColor } from 'components/buttons';
import Loading from 'components/Loading';
import { ItemDetailsScreenNavigationHeader } from 'components/navigations_headers';
import StatusBar from 'components/StatusBar';
import AppStyles, { DARK_GREY, GREY, ORANGE } from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { SearchStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { getFirestoreUserMangaById } from 'utils/firebase';
import getKitsuItemTitle from 'utils/kitsu/GetKitsuItemTitle';
import addItemToUser from 'utils/users/AddItemToUser';

export default function ItemDetailsScreen({
    navigation,
    route,
}: SearchStackScreenProps<'ItemDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [item, setItem] = useState<KitsuData>();
    const scroll = useRef(new Animated.Value(0)).current;
    const item_id: Id = route.params.item_id;
    const item_type: KitsuItemType = route.params.item_type;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    let image_url = useRef('');
    let item_title = item ? getKitsuItemTitle({ item: item }) : '';
    console.log('RERENDERING');

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
                console.log;
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

    function _displayAddToLibrary() {
        async function _addMangaToLibrary() {
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
        if (item && item_type === 'manga' && user.logged) {
            const manga_is_in_library = user.user_mangas_list.includes(
                getFirestoreUserMangaById({
                    user: user,
                    id: item.id,
                })
            );
            if (!manga_is_in_library) {
                return (
                    <ButtonBorderColor
                        color={ORANGE}
                        text={'Add to library'}
                        onPressFunction={() => {
                            _addMangaToLibrary();
                        }}
                    />
                );
            }
        }
    }

    function _ItemDetails() {
        if (item != undefined) {
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
                    <Animated.View style={styles.navigation_header_container}>
                        <ItemDetailsScreenNavigationHeader
                            item_title={item_title}
                            image_url={image_url.current}
                            navigation={navigation}
                            scroll={scroll}
                        ></ItemDetailsScreenNavigationHeader>
                    </Animated.View>
                    <View style={styles.content_container}>
                        <Image
                            source={
                                image_url.current !== ''
                                    ? { uri: image_url.current }
                                    : require('images/default_image.png')
                            }
                            style={styles.item_image}
                        />
                        <View style={styles.content_main_container}>
                            <View style={styles.content_overview_container}>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                                <Text style={styles.overview_text}>
                                    {item.attributes.synopsis}
                                </Text>
                            </View>
                            <View style={styles.content_bottom_container}>
                                <Text style={styles.bottom_text}>
                                    Vote:{' '}
                                    {item.attributes.averageRating
                                        ? (
                                              parseInt(
                                                  item.attributes.averageRating
                                              ) / 10
                                          ).toString()
                                        : ''}{' '}
                                    / 10
                                </Text>
                            </View>
                            {_displayAddToLibrary()}
                        </View>
                    </View>
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
    scrollview_container: {
        flex: 1,
    },

    navigation_header_container: {
        flex: 1,
    },
    content_container: {
        flex: 1,
    },
    item_image: {
        height: 150,
        width: 100,
        margin: 5,
        backgroundColor: GREY,
    },
    content_main_container: {
        flex: 3,
        margin: 5,
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
        color: DARK_GREY,
    },
    overview_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: GREY,
        fontStyle: 'italic',
    },
    bottom_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: GREY,
    },
});
