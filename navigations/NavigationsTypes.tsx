import {
    BottomTabNavigationProp,
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import type {
    MaterialTopTabNavigationProp,
    MaterialTopTabScreenProps,
} from '@react-navigation/material-top-tabs';
import type {
    CompositeNavigationProp,
    CompositeScreenProps,
} from '@react-navigation/native';
import type {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Id } from '../globals/GlobalTypes';

// Param list
export type RootBottomTabParamList = {
    Test: undefined;
    SearchTopTab: undefined;
    LibraryStack: undefined;
};

export type SearchTopTabParamList = {
    SearchMangaStack: undefined;
    SearchAnimeStack: undefined;
};

export type SearchMangaStackParamList = {
    SearchManga: undefined;
    MangaDetails: { id: Id };
};

export type SearchAnimeStackParamList = {
    SearchAnime: undefined;
    AnimeDetails: { id: Id };
};

export type LibraryStackParamList = {
    Library: undefined;
    MangaDetails: { id: Id };
};

// Screen props

export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type SearchTopTabScreenProps<T extends keyof SearchTopTabParamList> =
    CompositeScreenProps<
        MaterialTopTabScreenProps<SearchTopTabParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

export type SearchMangaStackScreenProps<
    T extends keyof SearchMangaStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<SearchMangaStackParamList, T>,
    SearchTopTabScreenProps<keyof SearchTopTabParamList>
>;

export type SearchAnimeStackScreenProps<
    T extends keyof SearchAnimeStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<SearchAnimeStackParamList, T>,
    SearchTopTabScreenProps<keyof SearchTopTabParamList>
>;

export type LibraryStackScreenProps<T extends keyof LibraryStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<LibraryStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

// Navigation prop

export type RootBottomTabNavigationProp<
    T extends keyof RootBottomTabParamList
> = BottomTabNavigationProp<RootBottomTabParamList, T>;

export type SearchTopTabNavigationProps<T extends keyof SearchTopTabParamList> =
    CompositeNavigationProp<
        MaterialTopTabNavigationProp<SearchTopTabParamList, T>,
        RootBottomTabNavigationProp<keyof RootBottomTabParamList>
    >;

export type SearchMangaScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SearchMangaStackParamList, 'SearchManga'>,
    SearchTopTabNavigationProps<keyof SearchTopTabParamList>
>;

export type SearchAnimeScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SearchAnimeStackParamList, 'SearchAnime'>,
    SearchTopTabNavigationProps<keyof SearchTopTabParamList>
>;

export type LibraryScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<LibraryStackParamList, 'Library'>,
    RootBottomTabNavigationProp<keyof RootBottomTabParamList>
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}
