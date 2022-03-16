import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ORANGE } from 'globals/AppStyles';
import React from 'react';
import { useAppSelector } from 'redux/Hooks';
import { ItemDetailsScreen, LibraryScreen } from 'screens';
import LoginStackNavigator from './LoginStackNavigator';
import { LibraryStackParamList } from './NavigationsTypes';

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

export default function LibraryStackNavigator() {
    const user = useAppSelector((state) => state.user);

    if (user.logged) {
        return (
            <LibraryStack.Navigator initialRouteName="Library">
                <LibraryStack.Screen
                    name="Library"
                    component={LibraryScreen}
                    options={{
                        headerTitleStyle: {
                            color: ORANGE,
                            fontFamily: 'Rubik-SemiBold',
                        },
                        headerShown: true,
                        title: 'My Library',
                    }}
                />
                <LibraryStack.Screen
                    name="ItemDetails"
                    component={ItemDetailsScreen}
                    options={() => ({
                        headerShown: false,
                    })}
                />
            </LibraryStack.Navigator>
        );
    } else {
        return (
            <LibraryStack.Navigator initialRouteName="LoginStack">
                <LibraryStack.Screen
                    name="LoginStack"
                    component={LoginStackNavigator}
                    options={{
                        headerShown: true,
                        headerTitleStyle: {
                            color: ORANGE,
                            fontFamily: 'Rubik-SemiBold',
                        },
                        title: 'Login',
                    }}
                />
            </LibraryStack.Navigator>
        );
    }
}
