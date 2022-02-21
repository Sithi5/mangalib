import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Components
import { GREY, LIGHTGREY, ORANGE, WHITE } from 'globals/AppStyles';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useAppSelector } from 'redux/Hooks';
import ProfilScreen from 'screens/ProfilScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
import LoginStackNavigator from './LoginStackNavigator';
// Type
import type { RootBottomTabParamList } from './NavigationsTypes';
import SearchTopTabNavigator from './SearchTopTabNavigator';

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function RootBottomTabNavigator() {
    const user = useAppSelector((state) => state.user);

    if (user.logged) {
        return (
            <RootBottomTab.Navigator
                initialRouteName="Profil"
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
                    name="Profil"
                    component={ProfilScreen}
                    options={{
                        title: 'Profil',
                        tabBarIcon: ({ color }) => {
                            const image_name = '../images/icon_profil.png';
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
    } else {
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
                    name="LoginStack"
                    component={LoginStackNavigator}
                    options={{
                        title: 'Login',
                        tabBarIcon: ({ color }) => {
                            const image_name = '../images/icon_profil.png';
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
}

const styles = StyleSheet.create({
    tab_bar_icon: {
        width: 30,
        height: 30,
    },
});
