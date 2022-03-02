import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ORANGE } from 'globals/AppStyles';
import React from 'react';
import { useAppSelector } from 'redux/Hooks';
import { LibraryScreen } from 'screens';
import UserMangaDetailsScreen from 'screens/UserMangaDetailsScreen';
import { LibraryStackParamList } from './NavigationsTypes';

const LibraryStack = createNativeStackNavigator<LibraryStackParamList>();

export default function LibraryStackNavigator() {
    const user = useAppSelector((state) => state.user);

    if (user.logged) {
        return (
            <LibraryStack.Navigator initialRouteName="Library">
                <LibraryStack.Screen
                    name="Library"
                    component={LibraryScreen}
                    options={{
                        headerShown: true,
                        title: 'My Library',
                        headerTitleStyle: { color: ORANGE },
                    }}
                />
                <LibraryStack.Screen
                    name="UserMangaDetails"
                    component={UserMangaDetailsScreen}
                    options={({ route }) => ({
                        headerTitleStyle: { color: ORANGE },
                        headerShown: true,
                        title: route.params.manga_title,
                    })}
                />
            </LibraryStack.Navigator>
        );
    } else {
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
            </LibraryStack.Navigator>
        );
    }
}
