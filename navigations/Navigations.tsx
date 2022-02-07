import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import TestScreen from '../components/TestScreen';
import PersonalLibraryScreen from '../components/PersonalLibraryScreen';

// Type
import type {
    PersonalLibraryStackParamList,
    RootDrawerParamList,
} from './Types';

const PersonalLibraryStack =
    createNativeStackNavigator<PersonalLibraryStackParamList>();

function PersonalLibraryStackNavigator() {
    return (
        <PersonalLibraryStack.Navigator initialRouteName="PersonalLibrary">
            <PersonalLibraryStack.Screen
                name="PersonalLibrary"
                component={PersonalLibraryScreen}
            />
        </PersonalLibraryStack.Navigator>
    );
}

const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawerNavigator() {
    return (
        <RootDrawer.Navigator initialRouteName="PersonalLibraryStack">
            <RootDrawer.Screen
                name="PersonalLibraryStack"
                component={PersonalLibraryStackNavigator}
                options={{
                    headerShown: false,
                    title: 'PersonalLibraryStack',
                }}
            />
            <RootDrawer.Screen name="Test" component={TestScreen} />
        </RootDrawer.Navigator>
    );
}
