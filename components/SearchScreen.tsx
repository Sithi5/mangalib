import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import DisplayLoading from './DisplayLoading';
import { getMangaDetailFromApi } from '../api/KitsuApi';
import AppStyles, { DEFAULT_MARGIN, WHITE } from '../globals/AppStyles';

// Types
import type { SearchStackScreenProps } from '../navigations/Types';

export type MangaData = {};

export default function SearchScreen({}: SearchStackScreenProps<'Search'>) {
    const [is_loading, setLoading] = useState(true);
    const [mangas_list, setMangasList] = useState<MangaData[]>([]);
    const search_title = useRef('');
    const page = useRef(0);
    const total_page = useRef(0);

    async function _getMangas(clear_movie_data: boolean = false) {
        if (search_title.current.length > 0) {
            try {
                setLoading(true);
                // let response = await getFilmsFromTMDBApiWithSearchedText(
                //     search_title.current,
                //     page + 1
                // );
                // page = response.page;
                // total_page = response.total_pages;
                // if (clear_movie_data) {
                //     setMoviesData(response.results);
                // } else {
                //     setMoviesData(movies_data.concat(response.results));
                // }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }

    function _newMangasSearch() {
        page.current = 0;
        total_page.current = 0;
        _getMangas(true);
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
                    color="green"
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
