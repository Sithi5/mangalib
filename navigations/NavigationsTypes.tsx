import {
    BottomTabScreenProps,
    BottomTabNavigationProp,
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
    PersonalLibraryStack: undefined;
};

export type SearchStackParamList = {
    Search: undefined;
    MangaDetails: { id: Id };
};

export type PersonalLibraryStackParamList = {
    PersonalLibrary: undefined;
};

// Screen props

export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type PersonalLibraryStackScreenProps<
    T extends keyof PersonalLibraryStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<PersonalLibraryStackParamList, T>,
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

export type SearchStackNavigationProp<T extends keyof SearchStackParamList> =
    CompositeNavigationProp<
        NativeStackNavigationProp<SearchStackParamList, T>,
        BottomTabNavigationProp<
            RootBottomTabParamList,
            keyof RootBottomTabParamList
        >
    >;

// CompositeNavigationProp<
// NativeStackNavigationProp<SearchStackParamList, "Search">,
// BottomTabNavigationProp<RootBottomTabParamList, keyof RootBottomTabParamList>>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}

// Type 'CompositeNavigationProp<NativeStackNavigationProp<SearchStackParamList, "Search">, BottomTabNavigationProp<RootBottomTabParamList, keyof RootBottomTabParamList>>' is not assignable to type 'SearchStackNavigationProp<"Search">'.
//   Type 'CompositeNavigationProp<NativeStackNavigationProp<SearchStackParamList, "Search">, BottomTabNavigationProp<RootBottomTabParamList, keyof RootBottomTabParamList>>' is not assignable to type '{ dispatch(action: Readonly<{ type: string; payload?: object | undefined; source?: string | undefined; target?: string | undefined; }> | ((state: StackNavigationState<SearchStackParamList>) => Readonly<...>)): void; ... 6 more ...; getState(): StackNavigationState<...>; }'.
//     The types returned by 'getState()' are incompatible between these types.
//       Type 'Readonly<{ key: string; index: number; routeNames: string[]; history?: unknown[] | undefined; routes: NavigationRoute<ParamListBase, string>[]; type: string; stale: false; }>' is not assignable to type 'StackNavigationState<SearchStackParamList>'.
