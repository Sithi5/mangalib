import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GREY, LIGHTGREY, ORANGE, WHITE } from 'globals/AppStyles';
import React from 'react';
import { SearchAnimeScreen, SearchMangaScreen } from 'screens';
import { SearchTopTabParamList } from './NavigationsTypes';

const SearchTopTab = createMaterialTopTabNavigator<SearchTopTabParamList>();

export default function SearchTopTabNavigator() {
    return (
        <SearchTopTab.Navigator
            initialRouteName="SearchManga"
            screenOptions={() => ({
                headerStyle: {
                    backgroundColor: WHITE,
                },
                tabBarActiveTintColor: ORANGE,
                tabBarActiveBackgroundColor: LIGHTGREY,
                tabBarInactiveBackgroundColor: WHITE,
                tabBarInactiveTintColor: GREY,
                tabBarShowLabel: true,
            })}
        >
            <SearchTopTab.Screen
                name="SearchManga"
                component={SearchAnimeScreen}
                options={{
                    title: 'Manga',
                }}
            />
            <SearchTopTab.Screen
                name="SearchAnime"
                component={SearchMangaScreen}
                options={{
                    title: 'Anime',
                }}
            />
        </SearchTopTab.Navigator>
    );
}
