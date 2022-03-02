import Constants from 'expo-constants';
import { BLACK, WHITE } from 'globals/AppStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function StatusBar() {
    return <View style={styles.status_bar}></View>;
}

const styles = StyleSheet.create({
    status_bar: {
        height: Constants.statusBarHeight,
        backgroundColor: WHITE,
    },
});
