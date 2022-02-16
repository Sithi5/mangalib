import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ItemDetailsScreen, LibraryScreen } from 'screens';
import { LibraryStackParamList } from './NavigationsTypes';

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

export default function LibraryStackNavigator() {
    return (
        <LibraryStack.Navigator initialRouteName="Library">
            <LibraryStack.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    headerShown: false,
                    title: 'Library',
                }}
            />
            <LibraryStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Details',
                }}
            />
        </LibraryStack.Navigator>
    );
}
