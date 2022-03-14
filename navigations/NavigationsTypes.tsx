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
import { KitsuItemType } from 'api/KitsuTypes';
import { Id } from 'globals/GlobalTypes';

// Param list
export type RootBottomTabParamList = {
    SearchStack: undefined;
    LibraryStack: undefined;
    WatchListStack: undefined;
    Profil: undefined;
    LoginStack: undefined;
};
export type SearchStackParamList = {
    SearchTopTab: undefined;
    ItemDetails: { item_id: Id; item_type: KitsuItemType; item_title: string };
};

export type SearchTopTabParamList = {
    SearchManga: undefined;
    SearchAnime: undefined;
};

export type LibraryStackParamList = {
    Library: undefined;
    ItemDetails: { item_id: Id; item_type: KitsuItemType; item_title: string };
};

export type LoginStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type WatchListStackParamList = {
    WatchList: undefined;
    UserAnimeDetails: { anime_id: Id; anime_title: string };
};

// Screen props
export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type SearchStackScreenProps<T extends keyof SearchStackParamList> =
    CompositeScreenProps<
        MaterialTopTabScreenProps<SearchStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

export type SearchTopTabScreenProps<T extends keyof SearchTopTabParamList> =
    CompositeScreenProps<
        MaterialTopTabScreenProps<SearchTopTabParamList, T>,
        SearchStackScreenProps<keyof SearchStackParamList>
    >;

export type LibraryStackScreenProps<T extends keyof LibraryStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<LibraryStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

export type WatchListStackScreenProps<T extends keyof WatchListStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<WatchListStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

export type LoginStackScreenProps<T extends keyof LoginStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<LoginStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

// Navigation prop
export type RootBottomTabNavigationProp<
    T extends keyof RootBottomTabParamList
> = BottomTabNavigationProp<RootBottomTabParamList, T>;

export type SearchStackNavigationProps<T extends keyof SearchStackParamList> =
    CompositeNavigationProp<
        MaterialTopTabNavigationProp<SearchStackParamList, T>,
        RootBottomTabNavigationProp<keyof RootBottomTabParamList>
    >;

export type SearchTopTabNavigationProps<T extends keyof SearchTopTabParamList> =
    CompositeNavigationProp<
        MaterialTopTabNavigationProp<SearchTopTabParamList, T>,
        SearchStackNavigationProps<keyof SearchStackParamList>
    >;

export type SearchTopTabAnimeScreenNavigationProps = CompositeNavigationProp<
    MaterialTopTabNavigationProp<SearchTopTabParamList, 'SearchAnime'>,
    SearchStackNavigationProps<keyof SearchStackParamList>
>;

export type SearchTopTabMangaScreenNavigationProps = CompositeNavigationProp<
    MaterialTopTabNavigationProp<SearchTopTabParamList, 'SearchManga'>,
    SearchStackNavigationProps<keyof SearchStackParamList>
>;

export type LibraryScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<LibraryStackParamList, 'Library'>,
    RootBottomTabNavigationProp<keyof RootBottomTabParamList>
>;

export type WatchListScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<WatchListStackParamList, 'WatchList'>,
    RootBottomTabNavigationProp<keyof RootBottomTabParamList>
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}
