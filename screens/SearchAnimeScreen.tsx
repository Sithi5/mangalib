import { kitsuSearch } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import { SearchTextInput } from 'components/inputs';
import { SearchAnimesList } from 'components/lists';
import Loading from 'components/Loading';
import AppStyles from 'globals/AppStyles';
import type { SearchTopTabScreenProps } from 'navigations/NavigationsTypes';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchStyles from './SearchStyles';

export type FunctionSearchAnimeArgs = {
    new_search?: boolean;
};

export default function SearchMangaScreen({
    navigation,
}: SearchTopTabScreenProps<'SearchAnime'>) {
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
                    let response = await kitsuSearch({
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
            <SearchTextInput
                placeholder="Anime title"
                search_text={search_text}
                on_submit_function={_searchAnimes}
            />
            <View style={SearchStyles.list_container}>
                <SearchAnimesList
                    navigation={navigation}
                    animes_list={animes_list}
                    last_page_reached={last_page_reached.current}
                    _searchAnimes={_searchAnimes}
                />
            </View>
            <Loading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
