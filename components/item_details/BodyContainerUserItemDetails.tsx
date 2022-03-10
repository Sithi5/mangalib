import { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import {
    DARK_GREY,
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    PALE_ORANGE,
    WHITE,
} from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserState } from 'redux/UserSlice';
import {
    getFirestoreUserAnimeById,
    getFirestoreUserMangaById,
} from 'utils/firebase';

type Props = {
    item: KitsuData | undefined;
    user: UserState;
    setShowLibrary: React.Dispatch<React.SetStateAction<boolean>>;
    item_type: 'manga' | 'anime';
};

export default function BodyContainerUserItemDetails(props: Props) {
    const { item, item_type, user, setShowLibrary } = props;

    function userAnimeDetails() {
        if (item !== undefined) {
            const user_item = getFirestoreUserAnimeById({
                user: user,
                id: item?.id,
            });
            if (!user_item) {
                return null;
            } else {
                const total_episodes_seen = user_item.seen_episodes.length;
                const total_episodes = user_item.episodes.length;
                return (
                    <View>
                        <Text style={styles.text_style}>
                            Total episodes seen: {total_episodes_seen}
                        </Text>
                        <Text style={styles.text_style}>
                            Total episodes: {total_episodes}
                        </Text>
                    </View>
                );
            }
        }
    }

    function userMangaDetails() {
        if (item !== undefined) {
            const user_item = getFirestoreUserMangaById({
                user: user,
                id: item?.id,
            });
            if (!user_item) {
                return null;
            } else {
                const total_possessed_volume =
                    user_item.possessed_volumes.length;
                const total_volume = user_item.volumes.length;
                const last_volume_possessed =
                    total_possessed_volume > 0
                        ? Math.max(...user_item.possessed_volumes)
                        : 0;
                return (
                    <View>
                        <Text style={styles.text_style}>
                            Possessed Volumes: {total_possessed_volume}
                        </Text>
                        <Text style={styles.text_style}>
                            Last volume possessed: {last_volume_possessed}
                        </Text>
                        <Text style={styles.text_style}>
                            Total Volumes: {total_volume}
                        </Text>
                        <View style={styles.button_container}>
                            <ButtonFullBackgroundColor
                                color={DARK_GREY}
                                text={'See my library'}
                                onPressFunction={() => {
                                    setShowLibrary(true);
                                }}
                            ></ButtonFullBackgroundColor>
                        </View>
                    </View>
                );
            }
        }
    }

    return (
        <View style={styles.main_container}>
            {item_type === 'manga' ? userMangaDetails() : userAnimeDetails()}
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: PALE_ORANGE,
        borderRadius: DEFAULT_RADIUS,
        flexDirection: 'column',
    },
    text_style: {
        fontSize: 17,
        margin: DEFAULT_MARGIN,
        fontFamily: 'Rubik-Medium',
        color: WHITE,
    },
    button_container: {
        alignSelf: 'center',
        width: '60%',
    },
});
