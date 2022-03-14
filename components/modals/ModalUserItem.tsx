import {
    KitsuAnimeAttributes,
    KitsuData,
    KitsuMangaAttributes,
} from 'api/KitsuTypes';
import {
    BLACK,
    DARK_GREY,
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    GREY,
    LIGHT_GREY,
    ORANGE,
    WHITE,
    WINDOW_WIDTH,
} from 'globals/AppStyles';
import React, { useEffect } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { UserState } from 'redux/UserSlice';
import {
    getFirestoreUserAnimeById,
    getFirestoreUserMangaById,
} from 'utils/firebase';
import ModalUserItemHeader from './ModalUserItemHeader';

type Props = {
    show_library_modal: boolean;
    setShowLibraryModal: React.Dispatch<React.SetStateAction<boolean>>;
    item: KitsuData | undefined;
    user: UserState;
    item_type: 'manga' | 'anime';
};

export default function ModalUserItem(props: Props) {
    const { show_library_modal, setShowLibraryModal, item, user, item_type } =
        props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!item || !user) {
            setShowLibraryModal(false);
        }
    }, [show_library_modal]);

    function _mangaFlatList() {
        if (item !== undefined) {
            const user_manga = getFirestoreUserMangaById({
                user: user,
                id: item.id,
            });
            if (user_manga) {
                return (
                    <View onStartShouldSetResponder={(): boolean => true}>
                        <FlatList
                            ListHeaderComponent={
                                <ModalUserItemHeader
                                    item_type={'manga'}
                                    user={user}
                                    user_item={user_manga}
                                    dispatch={dispatch}
                                />
                            }
                            data={user_manga.possessed_volumes}
                            keyExtractor={(item) => item.toString()}
                            numColumns={8}
                            renderItem={({ item }) => (
                                <View style={styles.item_bubble}>
                                    <Text style={styles.item_bubble_text}>
                                        {item}
                                    </Text>
                                </View>
                            )}
                        ></FlatList>
                    </View>
                );
            }
        }
    }

    function _animeFlatList() {
        if (item !== undefined) {
            const user_anime = getFirestoreUserAnimeById({
                user: user,
                id: item.id,
            });
            if (user_anime) {
                return (
                    <FlatList
                        data={user_anime.seen_episodes}
                        keyExtractor={(item) => item.toString()}
                        numColumns={8}
                        renderItem={({ item }) => (
                            <View style={styles.item_bubble}>
                                <Text style={styles.item_bubble_text}>
                                    {item}
                                </Text>
                            </View>
                        )}
                    ></FlatList>
                );
            }
        }
    }

    if (item !== undefined && user !== undefined) {
        return (
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={show_library_modal}
                    onRequestClose={() => {
                        setShowLibraryModal(false);
                    }}
                >
                    <TouchableOpacity
                        onPressOut={() => {
                            setShowLibraryModal(false);
                        }}
                        style={styles.main_container}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.content_main_container}>
                                {item_type === 'manga'
                                    ? _mangaFlatList()
                                    : _animeFlatList}
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    } else {
        return null;
    }
}

const ITEM_BUBBLE_SIZE = WINDOW_WIDTH / 10;

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
    },
    content_main_container: {
        borderTopLeftRadius: DEFAULT_RADIUS,
        borderTopRightRadius: DEFAULT_RADIUS,
        height: '60%',
        marginTop: 'auto',
        backgroundColor: LIGHT_GREY,
    },
    item_bubble: {
        margin: DEFAULT_MARGIN,
        height: ITEM_BUBBLE_SIZE,
        width: ITEM_BUBBLE_SIZE,
        borderRadius: ITEM_BUBBLE_SIZE / 2,
        backgroundColor: WHITE,
        borderWidth: 5,
        borderColor: ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_bubble_text: {
        fontSize: 15,
        fontFamily: 'Rubik-Bold',
        color: ORANGE,
    },
});
