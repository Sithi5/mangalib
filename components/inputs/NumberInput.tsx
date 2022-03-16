import { Ionicons } from '@expo/vector-icons';
import {
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    GREY,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export type TextInputOnSubmitFunctionArgs = {};

type Props = {
    search_text: React.MutableRefObject<string>;
    on_submit_function?: () => void;
    placeholder?: string;
    width?: string | number;
    min_value?: number;
    max_value?: number;
    keep_value_on_submit?: boolean;
};

export default function NumberInput(props: Props) {
    const {
        search_text,
        on_submit_function,
        placeholder = '1',
        width,
        min_value,
        max_value,
        keep_value_on_submit = true,
    } = props;
    const [text, setText] = useState(placeholder);

    return (
        <View style={styles.icons_and_input_container}>
            <TouchableOpacity
                onPress={() => {
                    if (min_value === undefined || Number(text) > min_value) {
                        const new_value = (Number(text) - 1).toString();
                        setText(new_value);
                        search_text.current = new_value;
                    }
                }}
            >
                <Ionicons
                    style={styles.icon_add_one}
                    name="remove"
                    size={20}
                    color={WHITE}
                />
            </TouchableOpacity>
            <View style={[styles.number_input_container, { width: width }]}>
                <TextInput
                    style={styles.number_input}
                    placeholder={placeholder}
                    placeholderTextColor={GREY}
                    selectionColor={GREY}
                    value={text}
                    keyboardType="numeric"
                    maxLength={3}
                    onChangeText={(text) => {
                        if (
                            min_value !== undefined &&
                            Number(text) < min_value
                        ) {
                            text = min_value.toString();
                        }
                        if (
                            max_value !== undefined &&
                            Number(text) > max_value
                        ) {
                            text = max_value.toString();
                        }
                        search_text.current = text;
                        setText(text);
                    }}
                    onSubmitEditing={() => {
                        if (
                            min_value !== undefined &&
                            Number(text) < min_value
                        ) {
                            setText(min_value.toString());
                        } else if (
                            max_value !== undefined &&
                            Number(text) > max_value
                        ) {
                            setText(max_value.toString());
                        } else {
                            setText(text);
                        }
                        if (!keep_value_on_submit) {
                            setText('1');
                        }
                        if (on_submit_function !== undefined) {
                            on_submit_function();
                        }
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    if (max_value === undefined || Number(text) < max_value) {
                        const new_value = (Number(text) + 1).toString();
                        setText(new_value);
                        search_text.current = new_value;
                    }
                }}
            >
                <Ionicons
                    style={styles.icon_add_one}
                    name="add"
                    size={20}
                    color={WHITE}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    icons_and_input_container: {
        flex: 1,
        padding: DEFAULT_MARGIN,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    number_input_container: {
        backgroundColor: WHITE,
        margin: DEFAULT_MARGIN,
        borderRadius: DEFAULT_RADIUS,
    },
    number_input: {
        borderColor: WHITE,
        paddingLeft: DEFAULT_MARGIN,
        color: GREY,
        fontFamily: 'Rubik-Light',
    },
    icon_add_one: {
        backgroundColor: ORANGE,
        borderRadius: 10,
    },
});
