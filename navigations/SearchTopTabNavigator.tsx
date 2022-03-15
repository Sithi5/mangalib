import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GREY, LIGHT_GREY, ORANGE, WHITE } from 'globals/AppStyles';
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
                tabBarLabelStyle: {
                    fontFamily: 'Rubik-Regular',
                },
                tabBarActiveTintColor: ORANGE,
                tabBarInactiveTintColor: GREY,
            })}
        >
            <SearchTopTab.Screen
                name="SearchManga"
                component={SearchMangaScreen}
                options={{
                    title: 'Manga',
                }}
            />
            <SearchTopTab.Screen
                name="SearchAnime"
                component={SearchAnimeScreen}
                options={{
                    title: 'Anime',
                }}
            />
        </SearchTopTab.Navigator>
    );
}
