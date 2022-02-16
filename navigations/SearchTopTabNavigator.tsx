import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GREY, LIGHTGREY, ORANGE, WHITE } from 'globals/AppStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import {
    ItemDetailsScreen,
    SearchAnimeScreen,
    SearchMangaScreen,
} from 'screens';
import {
    SearchAnimeStackParamList,
    SearchMangaStackParamList,
    SearchTopTabParamList,
} from './NavigationsTypes';

const SearchMangaStack =
    createNativeStackNavigator<SearchMangaStackParamList>();

function SearchMangaStackNavigator() {
    return (
        <SearchMangaStack.Navigator initialRouteName="SearchManga">
            <SearchMangaStack.Screen
                name="SearchManga"
                component={SearchMangaScreen}
                options={{
                    headerShown: false,
                    title: 'Search a manga',
                    headerTitleStyle: { color: GREY },
                }}
            />
            <SearchMangaStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Details',
                    headerTitleStyle: { color: GREY },
                }}
            />
        </SearchMangaStack.Navigator>
    );
}

const SearchAnimeStack =
    createNativeStackNavigator<SearchAnimeStackParamList>();

function SearchAnimeStackNavigator() {
    return (
        <SearchAnimeStack.Navigator initialRouteName="SearchAnime">
            <SearchAnimeStack.Screen
                name="SearchAnime"
                component={SearchAnimeScreen}
                options={{
                    headerShown: false,
                    title: 'Search an anime',
                }}
            />
            <SearchAnimeStack.Screen
                name="ItemDetails"
                component={ItemDetailsScreen}
                options={{
                    headerShown: true,
                    title: 'Details',
                }}
            />
        </SearchAnimeStack.Navigator>
    );
}

const SearchTopTab = createMaterialTopTabNavigator<SearchTopTabParamList>();

export default function SearchTopTabNavigator() {
    return (
        <SearchTopTab.Navigator
            initialRouteName="SearchMangaStack"
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
                name="SearchMangaStack"
                component={SearchMangaStackNavigator}
                options={{
                    title: 'Manga',
                }}
            />
            <SearchTopTab.Screen
                name="SearchAnimeStack"
                component={SearchAnimeStackNavigator}
                options={{
                    title: 'Anime',
                }}
            />
        </SearchTopTab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab_bar_icon: {
        width: 30,
        height: 30,
    },
});
