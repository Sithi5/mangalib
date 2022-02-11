import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    getMangaDetailsFromApi,
    getMultipleMangasDetailsFromApi,
} from '../api/KitsuApi';
import type { KitsuMangaData } from '../api/KitsuTypes';
import { OnePieceSearchMangasListIds } from '../data/MangasData';
import AppStyles from '../globals/AppStyles';
import type { PersonalLibraryStackScreenProps } from '../navigations/NavigationsTypes';
import DisplayLoading from './DisplayLoading';
import DisplayMangasList from './DisplayMangasList';

export default function PersonalLibraryScreen({
    navigation,
}: PersonalLibraryStackScreenProps<'PersonalLibrary'>) {
    const [is_loading, setLoading] = useState(false);
    // const personal_library_list = useAppSelector(
    //     (state) => state.personalLibrary.list
    // );
    const personal_library_list = OnePieceSearchMangasListIds;
    const [mangas_list, setMangasList] = useState<KitsuMangaData[]>([]);

    useEffect(() => {
        async function _getManga() {
            try {
                let tmp_mangas_list: KitsuMangaData[] = [];
                const responses = await getMultipleMangasDetailsFromApi({
                    manga_id_list: personal_library_list,
                });
                if (responses) {
                    responses.map((manga_details_kitsu_response) => {
                        tmp_mangas_list.push(manga_details_kitsu_response.data);
                    });
                    setMangasList(tmp_mangas_list);
                }
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
            <DisplayMangasList
                navigation={navigation}
                mangas_list={mangas_list}
            />
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
