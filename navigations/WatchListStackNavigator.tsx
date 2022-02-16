import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ItemDetailsScreen, LibraryScreen } from 'screens';
import { WatchListStackParamList } from './NavigationsTypes';

const WatchList = createNativeStackNavigator<WatchListStackParamList>();

export default function WatchListStackNavigator() {
    return (
        <WatchList.Navigator initialRouteName="Library">
            <WatchList.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    headerShown: false,
                    title: 'Library',
                }}
            />
            <WatchList.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Details',
                }}
            />
        </WatchList.Navigator>
    );
}
