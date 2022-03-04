import { DEFAULT_MARGIN, DEFAULT_RADIUS, WHITE } from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
    color: string;
    text: string;
    onPressFunction: () => void;
};

export default function ButtonFullBackgroundColor(props: Props) {
    const { color, onPressFunction, text } = props;

    return (
        <TouchableOpacity
            onPress={onPressFunction}
            style={[styles.button, { backgroundColor: color }]}
        >
            <Text style={styles.button_text}>{text}</Text>
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
    },
    button_text: {
        color: WHITE,
        fontSize: 16,
        fontFamily: 'Rubik-Medium',
    },
});
