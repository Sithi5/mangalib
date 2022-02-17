import 'react-native-gesture-handler'; //⚠️ Keep at top of the file ⚠️
import { NavigationContainer } from '@react-navigation/native';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import React from 'react';
import { Provider } from 'react-redux';
import RootBottomTabNavigator from './navigations/RootNavigations';
import { store } from './redux/Store';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyBLBupJ6FTLAVJg-rmKOFlYuqSd_vFQSCo',
//     authDomain: 'mangalib-a262c.firebaseapp.com',
//     projectId: 'mangalib-a262c',
//     storageBucket: 'mangalib-a262c.appspot.com',
//     messagingSenderId: '772899816475',
//     appId: '1:772899816475:web:93af2ca1972b5da31524be',
//     measurementId: 'G-CMT1SFP3QY',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootBottomTabNavigator />
            </NavigationContainer>
        </Provider>
    );
}
