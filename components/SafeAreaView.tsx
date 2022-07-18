import React from 'react';
import { View } from 'react-native';
import StatusBar from './StatusBar';

type Props = {
    children?: JSX.Element;
};

export default function safeAreaView({ children }: Props) {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            {children}
        </View>
    );
}
