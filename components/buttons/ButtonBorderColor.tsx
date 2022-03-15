import {
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    color: string;
    text: string;
    text_color?: string;
    text_font_size?: number;
    padding?: number;
    onPressFunction: () => void;
};

export default function ButtonBorderColor(props: Props) {
    const {
        color,
        onPressFunction,
        text,
        text_color = ORANGE,
        text_font_size,
        padding = 15,
    } = props;

    return (
        <TouchableOpacity
            onPress={onPressFunction}
            style={[styles.button, { borderColor: color, padding: padding }]}
        >
            <Text
                style={[
                    styles.button_text,
                    { color: text_color, fontSize: text_font_size },
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: DEFAULT_RADIUS,
        alignItems: 'center',
        margin: DEFAULT_MARGIN,
        backgroundColor: WHITE,
        borderWidth: 1,
    },
    button_text: {
        fontSize: 16,
        fontFamily: 'Rubik-Medium',
    },
});
