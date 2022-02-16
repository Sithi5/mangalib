import React, { useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { searchFromApi } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import AppStyles, { ORANGE } from 'globals/AppStyles';
import type { SearchAnimeStackScreenProps } from 'navigations/NavigationsTypes';
import Loading from 'components/Loading';
import { SearchAnimesList } from 'components/list';

export type FunctionSearchAnimeArgs = {
    new_search?: boolean;
};

export default function SearchMangaScreen({
    navigation,
}: SearchAnimeStackScreenProps<'SearchAnime'>) {
    const [is_loading, setLoading] = useState(false);
    const [animes_list, setAnimesList] = useState<KitsuData[]>([]);
    const search_text = useRef('');
    const next_page_url = useRef<string | undefined>();
    const last_page_reached = useRef<boolean>(false);

    async function _searchAnimes({
        new_search = false,
    }: FunctionSearchAnimeArgs) {
        if (search_text.current.length > 0) {
            if (new_search === true) {
                next_page_url.current = undefined;
                last_page_reached.current = false;
            }
            if (last_page_reached.current === false) {
                try {
                    setLoading(true);
                    let response = await searchFromApi({
                        search_type: 'anime',
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
            <Loading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
