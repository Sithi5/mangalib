import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
    is_loading: boolean;
};

export default function DisplayLoading(props: Props) {
    const { is_loading } = props;
    if (is_loading) {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size="large" color="grey" />
            </View>
        );
    }
    return null;
}

const styles = StyleSheet.create({
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
