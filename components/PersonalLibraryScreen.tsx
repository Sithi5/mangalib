import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DisplayLoading from './DisplayLoading';
import { useAppSelector } from '../redux/Hooks';

import type { PersonalLibraryStackScreenProps } from '../navigations/NavigationsTypes';
import { getMangaDetailFromApi } from '../api/KitsuApi';

export type MangaData = {};

export default function PersonalLibraryScreen({}: PersonalLibraryStackScreenProps<'PersonalLibrary'>) {
    const [is_loading, setLoading] = useState(false);
    const personal_library_list = useAppSelector(
        (state) => state.personalLibrary.list
    );
    const [mangas_list, setMangasList] = useState<MangaData[]>([]);

    useEffect(() => {
        async function _getManga() {
            try {
                let tmp_mangas_list: MangaData[] = [];
                // for (const id of personal_library_list) {
                const response = await getMangaDetailFromApi('one piece');
                tmp_mangas_list.push(response);
                // }
                console.log('tmp_mangas_list : ', tmp_mangas_list);
                setMangasList(tmp_mangas_list);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getManga();
    }, [personal_library_list]);

    return (
        <View style={styles.main_container}>
            {/* <DisplayMangasList
                navigation={navigation}
                mangas_list={mangas_list}
            /> */}
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
