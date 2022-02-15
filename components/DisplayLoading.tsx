import { ORANGE } from 'globals/AppStyles';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type Props = {
    is_loading: boolean;
    loading_container_style?: {};
    color?: string;
    size?: number | 'large' | 'small';
};

export default function DisplayLoading(props: Props) {
    const { is_loading, loading_container_style, color, size } = props;
    if (is_loading) {
        return (
            <View
                style={
                    loading_container_style
                        ? loading_container_style
                        : styles.loading_container
                }
            >
                <ActivityIndicator
                    size={size ? size : 'large'}
                    color={color ? color : ORANGE}
                />
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
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
