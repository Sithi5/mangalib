import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData, KitsuItemType } from 'api/KitsuTypes';
import { ButtonBorderColor } from 'components/buttons';
import Loading from 'components/Loading';
import { ItemDetailsScreenNavigationHeader } from 'components/navigations_headers';
import StatusBar from 'components/StatusBar';
import AppStyles, { DARK_GREY, GREY, ORANGE, WHITE } from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import { SearchStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { getFirestoreUserMangaById } from 'utils/firebase';
import getKitsuItemTitle from 'utils/kitsu/GetKitsuItemTitle';
import addItemToUser from 'utils/users/AddItemToUser';

const RATING_BUBBLE_CONTAINER_SIZE = 40;

export default function ItemDetailsScreen({
    navigation,
    route,
}: SearchStackScreenProps<'ItemDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [item, setItem] = useState<KitsuData>();
    const [header_z_index, setHeaderZIndex] = useState(0);
    const scroll = useRef(new Animated.Value(0)).current;
    const item_id: Id = route.params.item_id;
    const item_type: KitsuItemType = route.params.item_type;
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    let image_url = useRef('');
    let item_title = item ? getKitsuItemTitle({ item: item }) : '';
    console.log('RERENDERING');

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
                        ></ItemDetailsScreenNavigationHeader>
                    </Animated.View>

                    <View style={styles.rating_bubble_container}>
                        <View style={styles.rating_bubble_inside}>
                            <Text style={styles.rating_bubble_text}>
                                {item_rating_text}
                            </Text>
                        </View>
                    </View>

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
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nulla laoreet aliquet arcu
                                    aliquam imperdiet. Proin semper blandit
                                    turpis, ut gravida nibh porta vitae. Fusce
                                    id augue sit amet ligula dictum elementum ut
                                    quis nibh. Integer lacinia rutrum leo, at
                                    commodo elit elementum ut. Aenean laoreet
                                    pharetra rutrum. Aenean condimentum elit et
                                    eros sollicitudin, vitae vestibulum nunc
                                    suscipit. Mauris in mi sit amet purus tempor
                                    placerat. Nullam id ipsum erat. Etiam in
                                    aliquet dolor. Pellentesque viverra tellus
                                    sed odio sollicitudin ultricies. Aliquam
                                    placerat arcu ac turpis gravida maximus.
                                    Nulla sit amet gravida urna, eu dignissim
                                    turpis. Proin at mattis nisi, eu mattis
                                    nisl. In ut risus finibus, commodo mauris
                                    et, aliquam leo. Vestibulum sapien velit,
                                    pellentesque ut diam vitae, ultrices feugiat
                                    erat. Donec porttitor lacus vitae fermentum
                                    malesuada. Nam sapien orci, lobortis et
                                    eleifend at, semper in tortor. Pellentesque
                                    semper tellus quis magna placerat varius.
                                    Sed pharetra varius enim, ut cursus nisl
                                    vehicula ut. Maecenas rhoncus nibh quis
                                    posuere eleifend. Sed pulvinar, massa et
                                    auctor ornare, elit lectus sodales massa, at
                                    ultricies magna nunc a purus. Maecenas
                                    facilisis eros non dui lobortis, rhoncus
                                    tempus ipsum ornare. Curabitur feugiat
                                    tellus interdum sagittis porta. Sed justo
                                    odio, cursus nec mauris quis, faucibus
                                    congue quam. Sed egestas purus eu lectus
                                    sollicitudin, varius facilisis eros
                                    tincidunt. Aliquam erat volutpat. Mauris
                                    sollicitudin diam id justo egestas, eu
                                    pulvinar mauris vestibulum. Pellentesque
                                    habitant morbi tristique senectus et netus
                                    et malesuada fames ac turpis egestas.
                                    Integer consectetur non mauris sed
                                    imperdiet. Quisque scelerisque, justo a
                                    commodo mattis, lacus nisi malesuada magna,
                                    vitae aliquam tellus lacus quis metus. Ut
                                    tellus dolor, rhoncus dignissim ipsum eget,
                                    aliquet vulputate arcu. Sed faucibus libero
                                    ac sapien dapibus, at placerat massa
                                    molestie. Donec posuere ipsum nisi. Nulla
                                    ligula urna, porta et commodo cursus,
                                    laoreet vel diam. Aliquam purus sem,
                                    sagittis in pulvinar sit amet, pharetra quis
                                    mauris. Donec sit amet dolor vitae justo
                                    malesuada ultricies. Donec id consequat
                                    eros. Nunc a nibh metus. Proin non nisl sed
                                    odio molestie porta eu sed neque. Donec
                                    auctor augue vitae est condimentum, eget
                                    porta sem laoreet. Suspendisse potenti. Ut
                                    euismod in sem vel mollis. Etiam nisl nisi,
                                    tristique rutrum tincidunt a, vulputate eu
                                    nisl. Suspendisse quis faucibus orci.
                                    Aliquam nec rhoncus enim. Curabitur finibus
                                    gravida erat, ac accumsan lacus ultrices
                                    non. Praesent eget tempus velit. Vivamus
                                    dapibus nisl augue, sed condimentum metus
                                    tempus at. Integer ac leo sodales, molestie
                                    sem a, blandit tellus. Vestibulum porta est
                                    id dolor ornare efficitur. Morbi enim est,
                                    mattis id pellentesque vel, elementum in
                                    sem. Vivamus lacus eros, venenatis sit amet
                                    ligula id, pellentesque rhoncus lorem. Fusce
                                    vel ante convallis, dignissim erat in,
                                    tempor neque. Sed eu enim eget enim
                                    tincidunt facilisis ut eu orci. Pellentesque
                                    faucibus, magna in viverra vehicula, urna
                                    ante varius massa, in ultrices sem ante
                                    rhoncus enim. Praesent ultricies velit
                                    maximus, sagittis urna sagittis, vestibulum
                                    quam. Sed laoreet, risus ut porta suscipit,
                                    dui metus venenatis massa, non egestas nisi
                                    arcu non tellus.
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
        marginTop: -(RATING_BUBBLE_CONTAINER_SIZE / 2),
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
    overview_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: GREY,
        fontFamily: 'Rubik-LightItalic',
    },
    rating_bubble_text: {
        fontSize: 17,
        fontFamily: 'Rubik-Bold',
        color: ORANGE,
    },
    rating_bubble_inside: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
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
    bottom_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        fontFamily: 'Rubik-Bold',
        color: GREY,
    },
});
