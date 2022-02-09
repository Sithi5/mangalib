import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import DisplayLoading from './DisplayLoading';
import AppStyles, { DEFAULT_MARGIN, ORANGE, WHITE } from '../globals/AppStyles';
import { searchMangasFromApi } from '../api/KitsuApi';

import type { KitsuMangaData } from '../api/KitsuTypes';
import type { SearchStackScreenProps } from '../navigations/NavigationsTypes';

export default function SearchScreen({}: SearchStackScreenProps<'Search'>) {
    const [is_loading, setLoading] = useState(true);
    const [mangas_list, setMangasList] = useState<KitsuMangaData[]>([]);
    const search_text = useRef('');
    const next_page_url = useRef<string | undefined>();

    async function _searchMangas({
        clear_mangas_list = false,
    }: {
        clear_mangas_list: boolean;
    }) {
        if (search_text.current.length > 0) {
            try {
                setLoading(true);
                let response = await searchMangasFromApi({
                    search_text: search_text.current,
                    next_page_url: next_page_url.current,
                });
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

    function _newSearch() {
        next_page_url.current = undefined;
        _searchMangas({ clear_mangas_list: true });
    }

    return (
        <View style={AppStyles.main_container}>
            <TextInput
                style={styles.text_input}
                placeholder="Titre du film"
                onChangeText={(text) => {
                    search_text.current = text;
                }}
                onSubmitEditing={_newSearch}
            />
            <View style={styles.button_search_view}>
                <Button
                    color={ORANGE}
                    title="Rechercher"
                    onPress={_newSearch}
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
