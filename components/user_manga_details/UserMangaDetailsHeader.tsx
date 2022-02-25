import { Ionicons } from '@expo/vector-icons';
import { FirestoreUserManga } from 'api/FirebaseTypes';
import { kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import AppStyles, {
    BLACK,
    DEFAULT_MARGIN,
    GREY,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getKitsuItemTitle } from 'utils/kitsu';

type Props = {
    manga_id: Id;
    user_manga: FirestoreUserManga;
    kitsu_manga_data: KitsuData;
    addVolumeToUserManga: () => void;
    removeVolumeFromUserManga: () => void;
};

export default function UserMangaDetailsHeader(props: Props) {
    const {
        manga_id,
        user_manga,
        kitsu_manga_data,
        addVolumeToUserManga,
        removeVolumeFromUserManga,
    } = props;

    const image_url = kitsuGetItemImage({
        id: manga_id,
        item_type: 'manga',
        format: 'small',
    });

    if (kitsu_manga_data != undefined && user_manga) {
        return (
            <View style={AppStyles.main_container}>
                <Image source={{ uri: image_url }} style={styles.item_image} />
                <View style={styles.content_main_container}>
                    <View style={styles.content_title_container}>
                        <Text style={styles.title_text}>
                            {getKitsuItemTitle({ item: kitsu_manga_data })}
                        </Text>
                    </View>
                    <Text>Total manga:</Text>

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
                                removeVolumeFromUserManga();
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
                                addVolumeToUserManga();
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

const styles = StyleSheet.create({
    item_image: {
        flex: 3,
        height: 150,
        margin: 5,
        backgroundColor: 'gray',
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
    title_text: {
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    icon: {
        padding: 10,
    },
    text_input: {
        flex: 1,
        height: 30,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        color: BLACK,
    },
});
