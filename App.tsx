import React from 'react';
// import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

// import { store } from './redux/Store';

import RootTabNavigator from './navigations/Navigations';

export default function App() {
    return (
        // <Provider store={store}>
        <NavigationContainer>
            <RootTabNavigator />
        </NavigationContainer>
        // </Provider>
    );
}
