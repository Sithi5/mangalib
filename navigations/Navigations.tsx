import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet } from 'react-native';

// Components
import TestScreen from '../components/TestScreen';
import PersonalLibraryScreen from '../components/PersonalLibraryScreen';
import SearchScreen from '../components/SearchScreen';

// Type
import type {
    PersonalLibraryStackParamList,
    SearchStackParamList,
    RootBottomTabParamList,
} from './NavigationsTypes';
import { GREY, LIGHTGREY, ORANGE, WHITE } from '../globals/AppStyles';

const PersonalLibraryStack =
    createNativeStackNavigator<PersonalLibraryStackParamList>();

function PersonalLibraryStackNavigator() {
    return (
        <PersonalLibraryStack.Navigator initialRouteName="PersonalLibrary">
            <PersonalLibraryStack.Screen
                name="PersonalLibrary"
                component={PersonalLibraryScreen}
                options={{
                    headerShown: false,
                    title: 'Personal Library',
                }}
            />
        </PersonalLibraryStack.Navigator>
    );
}

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function SearchStackNavigator() {
    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    title: 'Search a manga',
                }}
            />
        </SearchStack.Navigator>
    );
}

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function RootBottomTabNavigator() {
    return (
        <RootBottomTab.Navigator
            initialRouteName="SearchStack"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: WHITE,
                },
                tabBarActiveTintColor: ORANGE,
                tabBarActiveBackgroundColor: LIGHTGREY,
                tabBarInactiveBackgroundColor: WHITE,
                tabBarInactiveTintColor: GREY,
                tabBarShowLabel: false,
            })}
        >
            <RootBottomTab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
                options={{
                    headerShown: true,
                    title: 'Search Manga',
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
                name="PersonalLibraryStack"
                component={PersonalLibraryStackNavigator}
                options={{
                    headerShown: true,
                    title: 'Personal Library',
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
