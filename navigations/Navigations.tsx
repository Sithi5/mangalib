import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import TestScreen from '../components/TestScreen';
import MyLibScreen from '../components/MyLibScreeen';

type RootDrawerParamList = {
    Test: undefined;
    MyLib: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function RootDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="MyLib">
            <Drawer.Screen
                name="MyLib"
                component={MyLibScreen}
                options={{
                    title: 'My library',
                }}
            />
            <Drawer.Screen name="Test" component={TestScreen} />
        </Drawer.Navigator>
    );
}
