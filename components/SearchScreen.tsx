import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import DisplayLoading from './DisplayLoading';
import { getMangaDetailFromApi } from '../api/KitsuApi';
import AppStyles, { DEFAULT_MARGIN, ORANGE, WHITE } from '../globals/AppStyles';

import type { SearchStackScreenProps } from '../navigations/Types';
import type { MangaData } from '../types/MangaData';

export default function SearchScreen({}: SearchStackScreenProps<'Search'>) {
    const [is_loading, setLoading] = useState(true);
    const [mangas_list, setMangasList] = useState<MangaData[]>([]);
    const search_title = useRef('');
    const next_page_url = useRef<string | undefined>();

    async function _getMangas({
        clear_mangas_list = false,
    }: {
        clear_mangas_list: boolean;
    }) {
        if (search_title.current.length > 0) {
            try {
                setLoading(true);
                let response = await getMangaDetailFromApi(
                    search_title.current,
                    next_page_url.current
                );
                if (response) {
                    next_page_url.current = response.links.next;
                    if (clear_mangas_list) {
                        setMangasList(response.data);
                    } else {
                        setMangasList(mangas_list.concat(response.data));
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    function _newMangasSearch() {
        next_page_url.current = undefined;
        _getMangas({ clear_mangas_list: true });
    }

    return (
        <View style={AppStyles.main_container}>
            <TextInput
                style={styles.text_input}
                placeholder="Titre du film"
                onChangeText={(text) => {
                    search_title.current = text;
                }}
                onSubmitEditing={_newMangasSearch}
            />
            <View style={styles.button_search_view}>
                <Button
                    color={ORANGE}
                    title="Rechercher"
                    onPress={_newMangasSearch}
                />
            </View>
            {/* <DisplayMoviesList
                navigation={navigation}
                movies_data={movies_data}
                page={page}
                total_page={total_page}
                _loadMovies={_loadMovies}
            /> */}
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    text_input: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
        height: 50,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
    },
    button_search_view: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
    },
    movie_items_container: {
        backgroundColor: WHITE,
        paddingTop: DEFAULT_MARGIN,
        paddingLeft: DEFAULT_MARGIN,
    },
});
