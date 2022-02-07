import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootDrawerParamList = {
    Test: undefined;
    PersonalLibraryStack: undefined;
};

export type RootDrawerScreenProps<T extends keyof RootDrawerParamList> =
    DrawerScreenProps<RootDrawerParamList, T>;

export type PersonalLibraryStackParamList = {
    PersonalLibrary: undefined;
};

export type PersonalLibraryStackScreenProps<
    T extends keyof PersonalLibraryStackParamList
> = CompositeScreenProps<
    NativeStackScreenProps<PersonalLibraryStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootDrawerParamList {}
    }
}
