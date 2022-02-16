import { searchFromApi } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import { SearchTextInput } from 'components/inputs';
import { SearchMangasList } from 'components/lists';
import Loading from 'components/Loading';
import AppStyles from 'globals/AppStyles';
import type { SearchMangaStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchStyles from './SearchStyles';

export type FunctionSearchMangaArgs = {
    new_search?: boolean;
};

export default function SearchMangaScreen({
    navigation,
}: SearchMangaStackScreenProps<'SearchManga'>) {
    const [is_loading, setLoading] = useState(false);
    const [mangas_list, setMangasList] = useState<KitsuData[]>([]);
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
                    let response = await searchFromApi({
                        search_type: 'manga',
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
            <SearchTextInput
                placeholder="Manga title"
                search_text={search_text}
                on_submit_function={_searchMangas}
            />
            <View style={SearchStyles.list_container}>
                <SearchMangasList
                    navigation={navigation}
                    mangas_list={mangas_list}
                    last_page_reached={last_page_reached.current}
                    _searchMangas={_searchMangas}
                />
            </View>
            <Loading is_loading={is_loading} />
        </View>
    );
}

const styles = StyleSheet.create({});
