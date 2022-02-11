import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import {
    getMangaDetailsFromApi,
    getMultipleMangasDetailsFromApi,
} from '../api/KitsuApi';
import type { KitsuMangaData } from '../api/KitsuTypes';
import { OnePieceSearchMangasListIds } from '../data/MangasData';
import AppStyles, { DEFAULT_MARGIN, ORANGE, WHITE } from '../globals/AppStyles';
import type { PersonalLibraryStackScreenProps } from '../navigations/NavigationsTypes';
import { replaceAll } from '../utils/StringsMethods';
import DisplayLoading from './DisplayLoading';
import DisplayMangasList from './DisplayMangasList';
import getMangaTitle from './GetMangaTitle';

export default function PersonalLibraryScreen({
    navigation,
}: PersonalLibraryStackScreenProps<'PersonalLibrary'>) {
    const [is_loading, setLoading] = useState(false);
    const search_text = useRef('');
    // const personal_library_list = useAppSelector(
    //     (state) => state.personalLibrary.list
    // );
    const personal_library_list = OnePieceSearchMangasListIds;
    const mangas_list = useRef<KitsuMangaData[]>([]);
    const [filtered_mangas_list, setFilteredMangasList] = useState<
        KitsuMangaData[]
    >([]);
    // console.log('RENDER - PersonalLibraryScreen');

    useEffect(() => {
        async function _getManga() {
            try {
                let tmp_mangas_list: KitsuMangaData[] = [];
                const responses = await getMultipleMangasDetailsFromApi({
                    manga_id_list: personal_library_list,
                });
                if (responses) {
                    responses.forEach((manga_details_kitsu_response) => {
                        if (manga_details_kitsu_response) {
                            tmp_mangas_list.push(
                                manga_details_kitsu_response.data
                            );
                        }
                    });
                    mangas_list.current = tmp_mangas_list;
                    setFilteredMangasList(mangas_list.current);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getManga();
    }, [personal_library_list]);

    function _filterMangas({}) {
        let tmp_filtered_mangas_list: KitsuMangaData[] = [];
        const compared_search_title = replaceAll({
            str: search_text.current.toLowerCase(),
            find: ' ',
            replace: '',
        });
        tmp_filtered_mangas_list = mangas_list.current.filter((manga) => {
            const compared_manga_title = replaceAll({
                str: getMangaTitle({
                    manga: manga,
                }).toLowerCase(),
                find: ' ',
                replace: '',
            });
            if (compared_manga_title.includes(compared_search_title)) {
                return manga;
            }
        });
        setFilteredMangasList(tmp_filtered_mangas_list);
    }

    return (
        <View style={AppStyles.main_container}>
            <TextInput
                style={AppStyles.text_input}
                placeholder="Manga title"
                onChangeText={(text) => {
                    search_text.current = text;
                }}
                onSubmitEditing={() => {
                    _filterMangas({});
                }}
            />
            <View style={AppStyles.button_search}>
                <Button color={ORANGE} title="Search" onPress={() => {}} />
            </View>
            <DisplayMangasList
                navigation={navigation}
                mangas_list={filtered_mangas_list}
            />
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
