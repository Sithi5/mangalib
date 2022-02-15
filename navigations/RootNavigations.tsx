import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import LibraryScreen from '../screens/LibraryScreen';
import MangaDetailsScreen from '../Screens/MangaDetailsScreen';
// Components
import TestScreen from '../components/TestScreen';
import { GREY, LIGHTGREY, ORANGE, WHITE } from '../globals/AppStyles';
// Type
import type {
    LibraryStackParamList,
    RootBottomTabParamList,
} from './NavigationsTypes';
import SearchTopTabNavigator from './SearchTopTabNavigator';

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

function LibraryStackNavigator() {
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
                name="MangaDetails"
                component={MangaDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Details',
                }}
            />
        </LibraryStack.Navigator>
    );
}

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function RootBottomTabNavigator() {
    return (
        <RootBottomTab.Navigator
            initialRouteName="SearchTopTab"
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
                    title: 'Library',
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
                name="Test"
                component={TestScreen}
                options={{
                    title: 'Test',
                    tabBarIcon: ({ color }) => {
                        const image_name = '../images/icon_testing.png';
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
