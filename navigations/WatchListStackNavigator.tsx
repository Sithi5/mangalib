import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ORANGE } from 'globals/AppStyles';
import React from 'react';
import { useAppSelector } from 'redux/Hooks';
import { ItemDetailsScreen, WatchListScreen } from 'screens';
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
                        headerShown: true,
                        headerTitleStyle: {
                            color: ORANGE,
                            fontFamily: 'Rubik-SemiBold',
                        },
                        title: 'My WatchList',
                    }}
                />
                <WatchList.Screen
                    name="ItemDetails"
                    component={ItemDetailsScreen}
                    options={({ route }) => ({
                        headerShown: false,
                    })}
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
