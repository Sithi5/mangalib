import { kitsuGetMultipleItemsDetails } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import { SearchTextInput } from 'components/inputs';
import { TextInputOnSubmitFunctionArgs } from 'components/inputs/SearchTextInput';
import { LibraryMangasList } from 'components/lists';
import Loading from 'components/Loading';
import AppStyles, { DEFAULT_MARGIN, ORANGE } from 'globals/AppStyles';
import type { LibraryStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'redux/Hooks';
import { getMangasIdsListFromFirestoreUsersMangasList } from 'utils/firebase/';
import { getKitsuItemTitle } from 'utils/kitsu/';
import { replaceAll } from 'utils/strings/';

export default function LibraryScreen({
    navigation,
}: LibraryStackScreenProps<'Library'>) {
    const [is_loading, setLoading] = useState(true);
    const search_text = useRef('');
    const mangas_list = useRef<KitsuData[]>([]);
    const [filtered_mangas_list, setFilteredMangasList] = useState<KitsuData[]>(
        []
    );
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        async function _getManga() {
            try {
                setLoading(true);
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

                    mangas_list.current = tmp_mangas_list.sort((a, b) =>
                        getKitsuItemTitle({ item: a }) >
                        getKitsuItemTitle({ item: b })
                            ? 1
                            : -1
                    );
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
                    str: getKitsuItemTitle({
                        item: manga,
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
    }

    if (user.logged === true) {
        return (
            <View style={AppStyles.main_container}>
                <SearchTextInput
                    placeholder="Manga title"
                    search_text={search_text}
                    on_submit_function={_filterMangas}
                />
                {is_loading ? (
                    <Loading is_loading={is_loading} />
                ) : (
                    <LibraryMangasList
                        navigation={navigation}
                        mangas_list={filtered_mangas_list}
                    />
                )}
            </View>
        );
    } else {
        return (
            <View style={AppStyles.main_container}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <View>
                        <Text style={{ fontFamily: 'Rubik-Medium' }}>
                            You need to be logged in to see your library.
                        </Text>
                    </View>
                    <View style={{ width: '60%', paddingTop: DEFAULT_MARGIN }}>
                        <ButtonFullBackgroundColor
                            color={ORANGE}
                            text={'Go to login'}
                            onPressFunction={() => {
                                navigation.navigate('LoginStack');
                            }}
                        ></ButtonFullBackgroundColor>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});
