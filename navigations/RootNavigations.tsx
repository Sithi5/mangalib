import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Components
import { GREY, LIGHT_GREY, ORANGE, WHITE } from 'globals/AppStyles';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { setUserLogged, setUserUid } from 'redux/UserSlice';
import { getUserData } from 'redux/UserSliceAsyncThunk';
import ProfilScreen from 'screens/ProfilScreen';
import LibraryStackNavigator from './LibraryStackNavigator';
import LoginStackNavigator from './LoginStackNavigator';
// Type
import type { RootBottomTabParamList } from './NavigationsTypes';
import SearchStackNavigator from './SearchStackNavigator';
import WatchListStackNavigator from './WatchListStackNavigator';

const RootBottomTab = createBottomTabNavigator<RootBottomTabParamList>();
const auth = getAuth();

function _checkForPersistingUser() {
    const dispatch = useAppDispatch();
    onAuthStateChanged(auth, (user) => {
        // Check if user is logged in.
        if (user) {
            dispatch(setUserLogged(true));
            dispatch(setUserUid(user.uid));
            async function _getUserData(user_uid: string) {
                try {
                    await dispatch(
                        getUserData({ user_uid: user_uid })
                    ).unwrap(); //Unwrap to raise error.
                } catch (error: any) {
                    console.error(error);
                }
            }
            _getUserData(user.uid);
        }
    });
}

export default function RootBottomTabNavigator() {
    const user = useAppSelector((state) => state.user);
    if (user.logged == false) {
        _checkForPersistingUser();
    }

    return (
        <RootBottomTab.Navigator
            initialRouteName="SearchStack"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: WHITE,
                },
                tabBarActiveTintColor: ORANGE,
                tabBarActiveBackgroundColor: LIGHT_GREY,
                tabBarInactiveBackgroundColor: WHITE,
                tabBarInactiveTintColor: GREY,
                tabBarShowLabel: false,
                headerTitleStyle: { color: ORANGE },
                headerShown: false,
            })}
        >
            <RootBottomTab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
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
                    headerShown: false,
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
                    headerShown: false,
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
            {user.logged ? (
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
            ) : (
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
            )}
        </RootBottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab_bar_icon: {
        width: 30,
        height: 30,
    },
});
