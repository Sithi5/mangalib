import type { CompositeScreenProps } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootBottomTabParamList = {
    Test: undefined;
    SearchStack: undefined;
    PersonalLibraryStack: undefined;
};

export type RootBottomTabScreenProps<T extends keyof RootBottomTabParamList> =
    BottomTabScreenProps<RootBottomTabParamList, T>;

export type PersonalLibraryStackParamList = {
    PersonalLibrary: undefined;
};

export type SearchStackParamList = {
    Search: undefined;
};

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

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootBottomTabParamList {}
    }
}
