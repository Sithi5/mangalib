import { FirestoreUserManga } from 'api/FirebaseTypes';
import { kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData } from 'api/KitsuTypes';
import AppStyles, {
    BLACK,
    DEFAULT_MARGIN,
    GREY,
    WHITE,
} from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { getKitsuItemTitle } from 'utils/kitsu';

type Props = {
    manga_id: Id;
    user_manga: FirestoreUserManga;
    kitsu_item_data: KitsuData;
    addVolumeToUserManga: (number_to_add?: number) => void;
    removeVolumeFromUserManga: (number_to_remove?: number) => void;
    total_manga_volumes_input: string;
    setTotalMangaVolumesInput: React.Dispatch<React.SetStateAction<string>>;
};

export default React.memo(function UserMangaDetailsHeader(props: Props) {
    const {
        manga_id,
        user_manga,
        kitsu_item_data,
        total_manga_volumes_input,
        addVolumeToUserManga,
        removeVolumeFromUserManga,
        setTotalMangaVolumesInput,
    } = props;

    const image_url = kitsuGetItemImage({
        id: manga_id,
        item_type: 'manga',
        format: 'small',
    });
    const total_manga_volumes = user_manga.volumes.length;
    const total_possessed_volumes = user_manga.possessed_volumes.length;

    if (kitsu_item_data != undefined && user_manga) {
        return (
            <View style={AppStyles.main_container}>
                <Image source={{ uri: image_url }} style={styles.item_image} />
                <View style={styles.content_main_container}>
                    <View style={styles.content_title_container}>
                        <Text style={styles.title_text}>
                            {getKitsuItemTitle({ item: kitsu_item_data })}
                        </Text>
                    </View>
                    <View style={{}}>
                        <Text style={styles.description_text}>
                            Total possessed volumes : {total_possessed_volumes}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.description_text}>
                                Total volumes :{' '}
                            </Text>
                            <TextInput
                                placeholder={total_manga_volumes.toString()}
                                placeholderTextColor={GREY}
                                selectionColor={GREY}
                                value={total_manga_volumes_input}
                                onChangeText={setTotalMangaVolumesInput}
                                onSubmitEditing={() => {
                                    if (
                                        parseInt(total_manga_volumes_input) >
                                        total_manga_volumes
                                    ) {
                                        addVolumeToUserManga(
                                            parseInt(
                                                total_manga_volumes_input
                                            ) - total_manga_volumes
                                        );
                                    } else {
                                        removeVolumeFromUserManga(
                                            total_manga_volumes -
                                                parseInt(
                                                    total_manga_volumes_input
                                                )
                                        );
                                    }
                                }}
                                keyboardType="numeric"
                                maxLength={3} //setting limit of input
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    } else {
        return null;
    }
});

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
    description_text: { color: GREY },
});
