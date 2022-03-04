import { DEFAULT_MARGIN, DEFAULT_RADIUS, WHITE } from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    color: string;
    text: string;
    onPressFunction: () => void;
};

export default function ButtonBorderColor(props: Props) {
    const { color, onPressFunction, text } = props;

    return (
        <TouchableOpacity
            onPress={onPressFunction}
            style={[styles.button, { borderColor: color }]}
        >
            <Text style={[styles.button_text, { color: color }]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 15,
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
