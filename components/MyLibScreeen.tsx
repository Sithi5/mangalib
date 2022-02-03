import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyLibScreen() {
    return (
        <View style={styles.main_container}>
            <Text>MY MANGA LIB</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
