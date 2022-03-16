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
    LoginStack: undefined;
};

export type LoginStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
};

export type WatchListStackParamList = {
    WatchList: undefined;
    ItemDetails: { item_id: Id; item_type: KitsuItemType; item_title: string };
    LoginStack: undefined;
};

// Screen props
export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type SearchStackScreenProps<T extends keyof SearchStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<SearchStackParamList, T>,
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

export type LoginStackFromRootBottomTabScreenProps<
    T extends keyof LoginStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<LoginStackParamList, T>,
    RootBottomTabScreenProps<keyof RootBottomTabParamList>
>;

export type LoginStackFromWatchListStackScreenProps<
    T extends keyof LoginStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<LoginStackParamList, T>,
    WatchListStackScreenProps<keyof WatchListStackParamList>
>;

export type LoginStackFromLibraryStackScreenProps<
    T extends keyof LoginStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<LoginStackParamList, T>,
    LibraryStackScreenProps<keyof LibraryStackParamList>
>;

export type LoginStackScreenProps<T extends keyof LoginStackParamList> =
    | LoginStackFromRootBottomTabScreenProps<T>
    | LoginStackFromWatchListStackScreenProps<T>
    | LoginStackFromLibraryStackScreenProps<T>;

// Navigation prop
export type RootBottomTabNavigationProp<
    T extends keyof RootBottomTabParamList
> = BottomTabNavigationProp<RootBottomTabParamList, T>;

export type SearchStackNavigationProps<T extends keyof SearchStackParamList> =
    CompositeNavigationProp<
        NativeStackNavigationProp<SearchStackParamList, T>,
        RootBottomTabNavigationProp<keyof RootBottomTabParamList>
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

export type SignUpStackScreenFromRootBottomTabNavigationProps =
    CompositeNavigationProp<
        NativeStackNavigationProp<LoginStackParamList, 'SignUp'>,
        RootBottomTabNavigationProp<keyof RootBottomTabParamList>
    >;
export type SignInStackScreenFromRootBottomTabNavigationProps =
    CompositeNavigationProp<
        NativeStackNavigationProp<LoginStackParamList, 'SignIn'>,
        RootBottomTabNavigationProp<keyof RootBottomTabParamList>
    >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}
