import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Components
import { GREY, LIGHTGREY, ORANGE, WHITE } from 'globals/AppStyles';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import LoginScreen from 'screens/LoginScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
// Type
import type { RootBottomTabParamList } from './NavigationsTypes';
import SearchTopTabNavigator from './SearchTopTabNavigator';
import WatchListStackNavigator from './WatchListStackNavigator';

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function RootBottomTabNavigator() {
    return (
        <RootBottomTab.Navigator
            initialRouteName="LibraryStack"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: WHITE,
                },
                tabBarActiveTintColor: ORANGE,
                tabBarActiveBackgroundColor: LIGHTGREY,
                tabBarInactiveBackgroundColor: WHITE,
                tabBarInactiveTintColor: GREY,
                tabBarShowLabel: false,
                headerTitleStyle: { color: ORANGE },
                headerShown: true,
            })}
        >
            <RootBottomTab.Screen
                name="SearchTopTab"
                component={SearchTopTabNavigator}
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => {
                        const image_name = '../images/icon_search.png';
                        return (
                            <Image
                                style={[
                                    styles.tab_bar_icon,
                                    { tintColor: color },
                                ]}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
            <RootBottomTab.Screen
                name="LibraryStack"
                component={LibraryStackNavigator}
                options={{
                    title: 'My Library',
                    tabBarIcon: ({ color }) => {
                        const image_name = '../images/icon_open_book.png';
                        return (
                            <Image
                                style={[
                                    styles.tab_bar_icon,
                                    { tintColor: color },
                                ]}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
            <RootBottomTab.Screen
                name="WatchListStack"
                component={WatchListStackNavigator}
                options={{
                    title: 'My WatchList',
                    tabBarIcon: ({ color }) => {
                        const image_name = '../images/icon_checklist.png';
                        return (
                            <Image
                                style={[
                                    styles.tab_bar_icon,
                                    { tintColor: color },
                                ]}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
            <RootBottomTab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Login',
                    tabBarIcon: ({ color }) => {
                        const image_name = '../images/icon_checklist.png';
                        return (
                            <Image
                                style={[
                                    styles.tab_bar_icon,
                                    { tintColor: color },
                                ]}
                                source={require(image_name)}
                            ></Image>
                        );
                    },
                }}
            />
        </RootBottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab_bar_icon: {
        width: 30,
        height: 30,
    },
});
