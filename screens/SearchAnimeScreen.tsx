import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { searchMangasFromApi } from 'api/KitsuApi';
import type { KitsuMangaData } from 'api/KitsuTypes';
import AppStyles, { ORANGE } from 'globals/AppStyles';
import type { SearchAnimeStackScreenProps } from 'navigations/NavigationsTypes';
import DisplayLoading from 'components/DisplayLoading';
import { SearchAnimesList } from 'components/list';

export type FunctionSearchMangaArgs = {
    new_search?: boolean;
};

export default function SearchMangaScreen({
    navigation,
}: SearchAnimeStackScreenProps<'SearchAnime'>) {
    const [is_loading, setLoading] = useState(false);
    const [animes_list, setAnimesList] = useState<KitsuMangaData[]>([]);
    const search_text = useRef('');
    const next_page_url = useRef<string | undefined>();
    const last_page_reached = useRef<boolean>(false);

    async function _searchAnimes({
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
                            setAnimesList(response.data);
                        } else {
                            setAnimesList(animes_list.concat(response.data));
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
                placeholder="Anime title"
                onChangeText={(text) => {
                    search_text.current = text;
                }}
                onSubmitEditing={() => {
                    _searchAnimes({ new_search: true });
                }}
            />
            <View style={AppStyles.button_search}>
                <Button
                    color={ORANGE}
                    title="Search"
                    onPress={() => {
                        _searchAnimes({ new_search: true });
                    }}
                />
            </View>
            <SearchAnimesList
                navigation={navigation}
                animes_list={animes_list}
                last_page_reached={last_page_reached.current}
                _searchAnimes={_searchAnimes}
            />
            <DisplayLoading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
