import {
    BottomTabNavigationProp,
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
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
    SearchStack: undefined;
    LibraryStack: undefined;
};

export type SearchStackParamList = {
    Search: undefined;
    MangaDetails: { id: Id };
};

export type LibraryStackParamList = {
    Library: undefined;
    MangaDetails: { id: Id };
};

// Screen props

export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type LibraryStackScreenProps<T extends keyof LibraryStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<LibraryStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

export type SearchStackScreenProps<T extends keyof SearchStackParamList> =
    CompositeScreenProps<
        NativeStackScreenProps<SearchStackParamList, T>,
        RootBottomTabScreenProps<keyof RootBottomTabParamList>
    >;

// Navigation prop
export type RootBottomTabNavigationProp<
    T extends keyof RootBottomTabParamList
> = BottomTabNavigationProp<RootBottomTabParamList, T>;

// type SearchStackNavigationProp<T extends keyof SearchStackParamList> =
//     CompositeNavigationProp<
//         NativeStackNavigationProp<SearchStackParamList, T>,
//         RootBottomTabNavigationProp<keyof RootBottomTabParamList>
//     >; // ⚠️ Don't use! Unfortunately not working because of nested generic type ?

export type SearchScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SearchStackParamList, 'Search'>,
    RootBottomTabNavigationProp<keyof RootBottomTabParamList>
>;

export type LibraryScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<LibraryStackParamList, 'Library'>,
    RootBottomTabNavigationProp<keyof RootBottomTabParamList>
>;

export type MangasListNavigationProp =
    | LibraryScreenNavigationProp
    | SearchScreenNavigationProp;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}
