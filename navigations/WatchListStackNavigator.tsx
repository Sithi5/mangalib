import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { WatchListScreen } from 'screens';
import { WatchListStackParamList } from './NavigationsTypes';

const WatchList = createNativeStackNavigator<WatchListStackParamList>();

export default function WatchListStackNavigator() {
    return (
        <WatchList.Navigator initialRouteName="WatchList">
            <WatchList.Screen
                name="WatchList"
                component={WatchListScreen}
                options={{
                    headerShown: false,
                    title: 'WatchList',
                }}
            />
        </WatchList.Navigator>
    );
}
