import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DisplayMangasList from './DisplayMangasList';
import DisplayLoading from './DisplayLoading';
import { useAppSelector } from '../redux/Hooks';

import type { PersonalLibraryStackScreenProps } from '../navigations/types';

export type MangaData = {};

export default function PersonalLibraryScreen({
    navigation,
}: PersonalLibraryStackScreenProps<'PersonalLibrary'>) {
    const [is_loading, setLoading] = useState(false);
    const personal_library_list = useAppSelector(
        (state) => state.personalLibrary.list
    );
    const [mangas_list, setMangasList] = useState<MangaData[]>([]);

    return (
        <View style={styles.main_container}>
            <DisplayMangasList
                navigation={navigation}
                mangas_list={mangas_list}
            />
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
