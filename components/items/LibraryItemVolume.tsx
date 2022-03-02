import { FirestoreUserManga } from 'api/FirebaseTypes';
import {
    DARK_GREY,
    DEFAULT_MARGIN,
    ORANGE,
    WHITE,
    WINDOW_WIDTH,
} from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
                        : DARK_GREY,
                }}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
});

export const VOLUME_BUBBLE_SIZE = WINDOW_WIDTH / 10;

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
