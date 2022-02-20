import { FirestoreUserManga } from 'api/FirebaseTypes';
import AppStyles, {
    DEFAULT_MARGIN,
    GREY,
    LIGHTGREY,
    ORANGE,
    RED,
    WHITE,
} from 'globals/AppStyles';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    user_manga: FirestoreUserManga;
};

export default function UserMangaVolumesList(props: Props) {
    const { user_manga } = props;

    function _addToUserPossessedVolumes({
        volume_number,
    }: {
        volume_number: number;
    }) {}

    return (
        <View style={AppStyles.main_container}>
            <FlatList
                data={user_manga.volumes}
                horizontal={false}
                keyExtractor={(item) => item.volume_number.toString()}
                numColumns={6}
                ItemSeparatorComponent={() => (
                    <View style={styles.separator_container}></View>
                )}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            _addToUserPossessedVolumes({
                                volume_number: item.volume_number,
                            });
                        }}
                        style={[
                            styles.volume_bubble,
                            {
                                borderColor:
                                    user_manga.possessed_volumes.includes(
                                        item.volume_number
                                    )
                                        ? ORANGE
                                        : GREY,
                            },
                        ]}
                    >
                        <Text>{item.volume_number}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const volume_bubble_size = 30;

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
