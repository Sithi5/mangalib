import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_MARGIN, DEFAULT_RADIUS, GREY, WHITE } from 'globals/AppStyles';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export type TextInputOnSubmitFunctionArgs = {
    new_search?: boolean;
    clear_search?: boolean;
};

type Props = {
    search_text: React.MutableRefObject<string>;
    on_submit_function: (Args: TextInputOnSubmitFunctionArgs) => void;
    placeholder: string;
};

export default function SearchTextInput(props: Props) {
    const { search_text, on_submit_function, placeholder } = props;
    const [text, setText] = useState('');

    return (
        <View style={styles.search_input_and_icon_container}>
            <TextInput
                style={styles.search_text_input}
                placeholder={placeholder}
                placeholderTextColor={GREY}
                selectionColor={GREY}
                value={text}
                onChangeText={(text) => {
                    search_text.current = text;
                    setText(text);
                }}
                onSubmitEditing={() => {
                    setText(text);
                    on_submit_function({ new_search: true });
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    setText('');
                    search_text.current = '';
                    on_submit_function({
                        clear_search: true,
                    });
                }}
            >
                <Ionicons
                    style={styles.icon}
                    name="close"
                    size={20}
                    color={GREY}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    search_input_and_icon_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
        margin: DEFAULT_MARGIN,
        borderRadius: DEFAULT_RADIUS,
    },
    icon: {
        padding: 10,
    },
    search_text_input: {
        flex: 1,
        height: 30,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        color: GREY,
        fontFamily: 'Rubik-Light',
    },
});
