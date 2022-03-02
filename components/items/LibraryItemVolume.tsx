import { FirestoreUserManga } from 'api/FirebaseTypes';
import { BLACK, DEFAULT_MARGIN, ORANGE, WHITE } from 'globals/AppStyles';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    user_manga: FirestoreUserManga;
    item: number;
    callAddOrRemoveFromUserPossessedVolumes: ({
        volume_number,
    }: {
        volume_number: number;
    }) => void;
};

export default React.memo(function LibraryItemVolume(props: Props) {
    const { user_manga, callAddOrRemoveFromUserPossessedVolumes, item } = props;

    return (
        <TouchableOpacity
            onPress={() => {
                callAddOrRemoveFromUserPossessedVolumes({
                    volume_number: item,
                });
            }}
            style={[
                styles.volume_bubble,
                {
                    backgroundColor: user_manga.possessed_volumes.includes(item)
                        ? ORANGE
                        : WHITE,
                },
            ]}
        >
            <Text
                style={{
                    color: user_manga.possessed_volumes.includes(item)
                        ? WHITE
                        : BLACK,
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
});

const window_width = Dimensions.get('window').width;
export const VOLUME_BUBBLE_SIZE = window_width / 10;

const styles = StyleSheet.create({
    volume_bubble: {
        margin: DEFAULT_MARGIN,
        height: VOLUME_BUBBLE_SIZE,
        width: VOLUME_BUBBLE_SIZE,
        borderRadius: VOLUME_BUBBLE_SIZE / 2,
        backgroundColor: WHITE,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
