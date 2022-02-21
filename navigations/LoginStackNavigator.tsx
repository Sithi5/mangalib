import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { LoginStackParamList } from './NavigationsTypes';
import React from 'react';
import SignInScreen from 'screens/SignInScreen';
import SignUpScreen from 'screens/SignUpScreen';

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

export default function LoginStackNavigator() {
    return (
        <LoginStack.Navigator initialRouteName="SignIn">
            <LoginStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false,
                    title: 'Sign In',
                }}
            />
            <LoginStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    headerShown: false,
                    title: 'Sign Up',
                }}
            />
        </LoginStack.Navigator>
    );
}
