import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { searchMangasFromApi } from '../api/KitsuApi';
import type { KitsuMangaData } from '../api/KitsuTypes';
import AppStyles, { DEFAULT_MARGIN, ORANGE, WHITE } from '../globals/AppStyles';
import type { SearchStackScreenProps } from '../navigations/NavigationsTypes';
import DisplayLoading from './DisplayLoading';
import DisplayMangasList from './DisplayMangasList';

export type FunctionSearchMangaArgs = {
    new_search?: boolean;
};

export default function SearchScreen({
    navigation,
}: SearchStackScreenProps<'Search'>) {
    const [is_loading, setLoading] = useState(false);
    const [mangas_list, setMangasList] = useState<KitsuMangaData[]>([]);
    const search_text = useRef('');
    const next_page_url = useRef<string | undefined>();
    const last_page_reached = useRef<boolean>(false);

    async function _searchMangas({
        new_search = false,
    }: FunctionSearchMangaArgs) {
        if (search_text.current.length > 0) {
            if (new_search === true) {
                next_page_url.current = undefined;
                last_page_reached.current = false;
            }
            if (last_page_reached.current === false) {
                try {
                    setLoading(true);
                    let response = await searchMangasFromApi({
                        search_text: search_text.current,
                        next_page_url: next_page_url.current,
                    });
                    if (response) {
                        if (response.links.next) {
                            next_page_url.current = response.links.next;
                        } else {
                            last_page_reached.current = true;
                        }

                        if (new_search === true) {
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
                    _searchMangas({ new_search: true });
                }}
            />
            <View style={AppStyles.button_search}>
                <Button
                    color={ORANGE}
                    title="Search"
                    onPress={() => {
                        _searchMangas({ new_search: true });
                    }}
                />
            </View>
            <DisplayMangasList
                navigation={navigation}
                mangas_list={mangas_list}
                last_page_reached={last_page_reached.current}
                _searchMangas={_searchMangas}
            />
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
