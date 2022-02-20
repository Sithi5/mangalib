import { kitsuGetMultipleItemsDetails } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import { SearchTextInput } from 'components/inputs';
import { TextInputOnSubmitFunctionArgs } from 'components/inputs/SearchTextInput';
import { LibraryMangasList } from 'components/lists';
import Loading from 'components/Loading';
import AppStyles, { ORANGE } from 'globals/AppStyles';
import type { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { scrollTo } from 'react-native-reanimated';
import { useAppSelector } from 'redux/Hooks';
import getMangasIdsListFromFirestoreUsersMangasList from 'utils/firebase/getMangasIdsListFromFirestoreUsersMangasList';
import getMangaTitle from 'utils/kitsu/GetKitsuItemTitle';
import { replaceAll } from 'utils/strings/replaceAll';

export default function LibraryScreen({
    navigation,
}: LibraryStackScreenProps<'Library'>) {
    const [is_loading, setLoading] = useState(false);
    const search_text = useRef('');
    const mangas_list = useRef<KitsuData[]>([]);
    const [filtered_mangas_list, setFilteredMangasList] = useState<KitsuData[]>(
        []
    );
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        async function _getManga() {
            try {
                let tmp_mangas_list: KitsuData[] = [];
                const mangas_ids_list =
                    getMangasIdsListFromFirestoreUsersMangasList({
                        user_mangas_list: user.user_mangas_list,
                    });
                const responses = await kitsuGetMultipleItemsDetails({
                    item_id_list: mangas_ids_list,
                    item_type: 'manga',
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
    }, [user.user_mangas_list]);

    function _filterMangas({ clear_search }: TextInputOnSubmitFunctionArgs) {
        if (search_text.current.length === 0 || clear_search) {
            setFilteredMangasList(mangas_list.current);
        } else {
            let tmp_filtered_mangas_list: KitsuData[] = [];
            const compared_search_title = replaceAll({
                str: search_text.current.toLowerCase(),
                find: ' ',
                replace: '',
            });
            tmp_filtered_mangas_list = mangas_list.current.filter((manga) => {
                const compared_manga_title = replaceAll({
                    str: getMangaTitle({
                        item: manga,
                    }).toLowerCase(),
                    find: ' ',
                    replace: '',
                });
                if (compared_manga_title.includes(compared_search_title)) {
                    return manga;
                }
            });
            // tmp_filtered_mangas_list.sort((a, b) =>
            //     getMangaTitle({ item: a }) > getMangaTitle({ item: b }) ? 1 : -1
            // );
            setFilteredMangasList(tmp_filtered_mangas_list);
        }
    }

    if (user.logged === true) {
        return (
            <View style={AppStyles.main_container}>
                <SearchTextInput
                    placeholder="Manga title"
                    search_text={search_text}
                    on_submit_function={_filterMangas}
                />
                <LibraryMangasList
                    navigation={navigation}
                    mangas_list={filtered_mangas_list}
                />
                <Loading is_loading={is_loading} />
            </View>
        );
    } else {
        return (
            <View style={AppStyles.main_container}>
                <Text>You need to be connected to see your library.</Text>
                <ButtonFullBackgroundColor
                    color={ORANGE}
                    text={'Go to login'}
                    onPressFunction={() => {
                        navigation.navigate('Login');
                    }}
                ></ButtonFullBackgroundColor>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
