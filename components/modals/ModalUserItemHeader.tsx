import { FirestoreUserAnime, FirestoreUserManga } from 'api/FirebaseTypes';
import {
    ButtonBorderColor,
    ButtonFullBackgroundColor,
} from 'components/buttons';
import { NumberInput } from 'components/inputs';
import { BLACK, DEFAULT_MARGIN, ORANGE, RED, WHITE } from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AppDispatch } from 'redux/store';
import { UserState } from 'redux/UserSlice';
import {
    addToUserAnimeSeenEpisodes,
    addToUserMangaPossessedVolumes,
    removeFromUserAnimesSeenEpisodes,
    removeFromUserMangaPossessedVolumes,
} from 'utils/users';

type Props = {
    item_type: 'manga' | 'anime';
    user: UserState;
    user_item: FirestoreUserManga | FirestoreUserAnime;
    dispatch: AppDispatch;
};

export default function ModalUserItemHeader(props: Props) {
    const from_number = React.useRef('1');
    const to_number = React.useRef('1');
    const { item_type, user, user_item, dispatch } = props;

    function _addItemsToUser() {
        if (item_type === 'manga') {
            addToUserMangaPossessedVolumes({
                user: user,
                user_manga: user_item as FirestoreUserManga,
                from_number: Number(from_number.current),
                to_number: Number(to_number.current),
                dispatch: dispatch,
            });
        } else {
            addToUserAnimeSeenEpisodes({
                user: user,
                user_anime: user_item as FirestoreUserAnime,
                from_number: Number(from_number.current),
                to_number: Number(to_number.current),
                dispatch: dispatch,
            });
        }
    }
    function _removeItemsFromUser() {
        if (item_type === 'manga') {
            removeFromUserMangaPossessedVolumes({
                user: user,
                user_manga: user_item as FirestoreUserManga,
                from_number: Number(from_number.current),
                to_number: Number(to_number.current),
                dispatch: dispatch,
            });
        } else {
            removeFromUserAnimesSeenEpisodes({
                user: user,
                user_anime: user_item as FirestoreUserAnime,
                from_number: Number(from_number.current),
                to_number: Number(to_number.current),
                dispatch: dispatch,
            });
        }
    }

    return (
        <View style={styles.main_container}>
            <View style={styles.number_inputs_container}>
                <View style={styles.number_input_with_title_container}>
                    <Text style={styles.number_input_title}>From :</Text>
                    <NumberInput
                        search_text={from_number}
                        width={'30%'}
                        placeholder={'1'}
                        min_value={0}
                    />
                </View>
                <View style={styles.number_input_with_title_container}>
                    <Text style={styles.number_input_title}>To :</Text>
                    <NumberInput
                        search_text={to_number}
                        width={'30%'}
                        placeholder={'1'}
                        min_value={0}
                    />
                </View>
            </View>
            <View style={styles.add_or_remove_button_container}>
                <View style={styles.add_or_remove_button}>
                    <ButtonBorderColor
                        color={ORANGE}
                        text={
                            item_type === 'manga'
                                ? 'Add volumes'
                                : 'Add episodes'
                        }
                        text_font_size={17}
                        padding={5}
                        onPressFunction={_addItemsToUser}
                    />
                </View>
                <View style={styles.add_or_remove_button}>
                    <ButtonFullBackgroundColor
                        color={RED}
                        text_color={WHITE}
                        text={
                            item_type === 'manga'
                                ? 'Remove volumes'
                                : 'Remove episodes'
                        }
                        text_font_size={17}
                        padding={5}
                        onPressFunction={_removeItemsFromUser}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: DEFAULT_MARGIN,
    },
    number_inputs_container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    number_input_with_title_container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    number_input_title: {
        alignSelf: 'center',
        margin: 5,
        fontFamily: 'Rubik-Bold',
        fontSize: 17,
        color: BLACK,
    },
    add_or_remove_button_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    header_text: {
        margin: 5,
        fontFamily: 'Rubik-Bold',
        fontSize: 17,
        color: BLACK,
    },
    add_or_remove_button: {
        margin: DEFAULT_MARGIN,
        width: '40%',
    },
    input_from_number: {},
    input_to_number: {},
});
