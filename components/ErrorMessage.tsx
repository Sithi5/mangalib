// components/ErrorMessage.js

import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Args = {
    error: string;
    visible: boolean;
};

const ErrorMessage = ({ error, visible }: Args) => {
    if (!error || !visible) {
        return null;
    }

    return <Text style={styles.error_text}>⚠️{error}</Text>;
};

const styles = StyleSheet.create({
    error_text: {
        color: '#fdca40',
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600',
    },
});

export default ErrorMessage;
