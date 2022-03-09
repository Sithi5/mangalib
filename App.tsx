import { NavigationContainer } from '@react-navigation/native';
import 'config/firebase';
import React from 'react';
// Ignore annoying warning comming from firebase
import { LogBox } from 'react-native';
import 'react-native-gesture-handler'; //⚠️ Keep at top of the file ⚠️
import { Provider } from 'react-redux';
import RootBottomTabNavigator from './navigations/RootNavigations';
import { store } from './redux/Store';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
    let [fontsLoaded] = useFonts({
        'Rubik-LightItalic': require('assets/fonts/Rubik-LightItalic.ttf'),
        'Rubik-Light': require('assets/fonts/Rubik-Light.ttf'),
        'Rubik-Regular': require('assets/fonts/Rubik-Regular.ttf'),
        'Rubik-Medium': require('assets/fonts/Rubik-Medium.ttf'),
        'Rubik-SemiBold': require('assets/fonts/Rubik-SemiBold.ttf'),
        'Rubik-Bold': require('assets/fonts/Rubik-Bold.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    console.log('RENDERING APP');

    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootBottomTabNavigator />
            </NavigationContainer>
        </Provider>
    );
}
