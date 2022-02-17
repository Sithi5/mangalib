import 'react-native-gesture-handler'; //⚠️ Keep at top of the file ⚠️
import { NavigationContainer } from '@react-navigation/native';

import 'config/firebase';
import React from 'react';
import { Provider } from 'react-redux';
import RootBottomTabNavigator from './navigations/RootNavigations';
import { store } from './redux/Store';

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootBottomTabNavigator />
            </NavigationContainer>
        </Provider>
    );
}
