import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import DisplayLoading from './DisplayLoading';
import { useAppSelector } from '../redux/Hooks';

import type { PersonalLibraryStackScreenProps } from '../navigations/NavigationsTypes';
import { searchMangasFromApi } from '../api/KitsuApi';
import AppStyles from '../globals/AppStyles';

import type { KitsuMangaData } from '../api/KitsuTypes';

export default function PersonalLibraryScreen({}: PersonalLibraryStackScreenProps<'PersonalLibrary'>) {
    const [is_loading, setLoading] = useState(false);
    const personal_library_list = useAppSelector(
        (state) => state.personalLibrary.list
    );
    const [mangas_list, setMangasList] = useState<KitsuMangaData[]>([]);

    useEffect(() => {
        async function _getManga() {
            try {
                let tmp_mangas_list: KitsuMangaData[] = [];
                // for (const id of personal_library_list) {
                const response = await searchMangasFromApi({
                    search_text: 'one piece',
                });
                // tmp_mangas_list.push(response);
                // }
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
        <View style={AppStyles.main_container}>
            {/* <DisplayMangasList
                navigation={navigation}
                mangas_list={mangas_list}
            /> */}
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
