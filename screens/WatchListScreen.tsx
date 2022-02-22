import { kitsuGetMultipleItemsDetails } from 'api/KitsuApi';
import type { KitsuData } from 'api/KitsuTypes';
import { ButtonFullBackgroundColor } from 'components/buttons';
import { SearchTextInput } from 'components/inputs';
import { TextInputOnSubmitFunctionArgs } from 'components/inputs/SearchTextInput';
import Loading from 'components/Loading';
import AppStyles, { DEFAULT_MARGIN, ORANGE } from 'globals/AppStyles';
import type { WatchListStackScreenProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'redux/Hooks';
import { getAnimesIdsListFromFirestoreUsersAnimesList } from 'utils/firebase';
import { getKitsuItemTitle } from 'utils/kitsu/';
import { replaceAll } from 'utils/strings/';

export default function WatchListScreen({
    navigation,
}: WatchListStackScreenProps<'WatchList'>) {
    const [is_loading, setLoading] = useState(false);
    const search_text = useRef('');
    const anime_list = useRef<KitsuData[]>([]);
    const [filtered_anime_list, setFilteredAnimesList] = useState<KitsuData[]>(
        []
    );
    const user = useAppSelector((state) => state.user);

    useEffect(() => {
        async function _getManga() {
            try {
                setLoading(true);
                let tmp_anime_list: KitsuData[] = [];
                const animes_ids_list =
                    getAnimesIdsListFromFirestoreUsersAnimesList({
                        user_animes_list: user.user_animes_list,
                    });
                const responses = await kitsuGetMultipleItemsDetails({
                    item_id_list: animes_ids_list,
                    item_type: 'anime',
                });
                if (responses) {
                    responses.forEach((manga_details_kitsu_response) => {
                        if (manga_details_kitsu_response) {
                            tmp_anime_list.push(
                                manga_details_kitsu_response.data
                            );
                        }
                    });

                    anime_list.current = tmp_anime_list.sort((a, b) =>
                        getKitsuItemTitle({ item: a }) >
                        getKitsuItemTitle({ item: b })
                            ? 1
                            : -1
                    );
                    setFilteredAnimesList(anime_list.current);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getManga();
    }, [user.user_animes_list]);

    function _filterAnimes({ clear_search }: TextInputOnSubmitFunctionArgs) {
        if (search_text.current.length === 0 || clear_search) {
            setFilteredAnimesList(anime_list.current);
        } else {
            let tmp_filtered_anime_list: KitsuData[] = [];
            const compared_search_title = replaceAll({
                str: search_text.current.toLowerCase(),
                find: ' ',
                replace: '',
            });
            tmp_filtered_anime_list = anime_list.current.filter((manga) => {
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
            setFilteredAnimesList(tmp_filtered_anime_list);
        }
    }

    if (user.logged === true) {
        return (
            <View style={AppStyles.main_container}>
                <SearchTextInput
                    placeholder="Anime title"
                    search_text={search_text}
                    on_submit_function={_filterAnimes}
                />
                {/* <WatchListAnimesList
                    navigation={navigation}
                    anime_list={filtered_anime_list}
                /> */}

                <Loading is_loading={is_loading} />
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
                        <Text>
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
