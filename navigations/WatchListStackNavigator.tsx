import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAppSelector } from 'redux/Hooks';
import { WatchListScreen } from 'screens';
import UserAnimeDetailsScreen from 'screens/UserAnimeDetailsScreen';
import { WatchListStackParamList } from './NavigationsTypes';

const WatchList = createNativeStackNavigator<WatchListStackParamList>();

export default function WatchListStackNavigator() {
    const user = useAppSelector((state) => state.user);

    if (user.logged) {
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
                <WatchList.Screen
                    name="UserAnimeDetails"
                    component={UserAnimeDetailsScreen}
                    options={{
                        headerShown: true,
                        title: 'Details',
                    }}
                />
            </WatchList.Navigator>
        );
    } else {
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
}
