import 'react-native-gesture-handler'; //⚠️ Keep at top of the file ⚠️
import { NavigationContainer } from '@react-navigation/native';

import 'config/firebase';
import React from 'react';
import { Provider } from 'react-redux';
import RootBottomTabNavigator from './navigations/RootNavigations';
import { store } from './redux/Store';

// Ignore annoying warning comming from firebase
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);
LogBox.ignoreLogs(['Setting a timer']);
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootBottomTabNavigator />
            </NavigationContainer>
        </Provider>
    );
}
