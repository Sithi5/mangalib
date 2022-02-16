import { DEFAULT_MARGIN, DEFAULT_RADIUS, GREY, WHITE } from 'globals/AppStyles';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';

export type TextInputOnSubmitFunctionArgs = {
    new_search?: boolean;
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
        <View style={styles.search_input_container}>
            <TextInput
                style={styles.search_text_input}
                placeholder={placeholder}
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
                }}
            >
                <Icon
                    style={styles.search_icon}
                    name="close"
                    size={20}
                    color={GREY}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    search_input_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
        borderRadius: DEFAULT_RADIUS,
    },
    search_icon: {
        padding: 10,
    },
    search_text_input: {
        flex: 1,
        marginTop: DEFAULT_MARGIN,
        height: 50,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        borderRadius: DEFAULT_RADIUS,
    },
});
