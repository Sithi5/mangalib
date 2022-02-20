import { kitsuGetItemDetails, kitsuGetItemImage } from 'api/KitsuApi';
import { KitsuData, KitsuItemType } from 'api/KitsuTypes';
import Loading from 'components/Loading';
import AppStyles from 'globals/AppStyles';
import { Id } from 'globals/GlobalTypes';
import {
    SearchAnimeStackScreenProps,
    SearchMangaStackScreenProps,
} from 'navigations/NavigationsTypes';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import getKitsuItemTitle from 'utils/kitsu/GetKitsuItemTitle';

export default function ItemDetailsScreen({
    route,
}:
    | SearchMangaStackScreenProps<'ItemDetails'>
    | SearchAnimeStackScreenProps<'ItemDetails'>) {
    const [is_loading, setLoading] = useState(true);
    const [item, setItem] = useState<KitsuData>();
    const id: Id = route.params.id;
    const item_type: KitsuItemType = route.params.item_type;

    useEffect(() => {
        async function _getItemDetails() {
            try {
                const response = await kitsuGetItemDetails({
                    id: id,
                    item_type: item_type,
                });
                if (response) {
                    setItem(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        _getItemDetails();
    }, [id]);

    function _ItemDetails() {
        if (item != undefined) {
            const image_url = kitsuGetItemImage({
                id: id,
                item_type: item_type,
                format: 'small',
            });

            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        source={{ uri: image_url }}
                        style={styles.item_image}
                    />
                    <View style={styles.content_main_container}>
                        <View style={styles.content_title_container}>
                            <Text style={styles.title_text}>
                                {getKitsuItemTitle({ item: item })}
                            </Text>
                        </View>
                        <View style={styles.content_overview_container}>
                            <Text style={styles.overview_text}>
                                {item.attributes.synopsis}
                            </Text>
                        </View>
                        <View style={styles.content_bottom_container}>
                            <Text style={styles.bottom_text}>
                                Vote: {item.attributes.averageRating} / 100
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            );
        }
    }

    return (
        <View style={AppStyles.main_container}>
            <Loading is_loading={is_loading} />
            {_ItemDetails()}
        </View>
    );
}

const styles = StyleSheet.create({
    scrollview_container: {
        flex: 1,
    },
    item_image: {
        flex: 3,
        height: 150,
        margin: 5,
        backgroundColor: 'gray',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content_main_container: {
        flex: 3,
        margin: 5,
    },
    content_title_container: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
    },
    content_overview_container: {
        flex: 1,
        margin: 5,
    },
    content_bottom_container: {
        flex: 1,
        margin: 5,
    },
    title_text: {
        flexWrap: 'wrap',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    overview_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: 'grey',
        fontStyle: 'italic',
    },
    bottom_text: {
        flexWrap: 'wrap',
        fontSize: 17,
        color: 'dimgrey',
    },

    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    share_image: {
        width: 30,
        height: 30,
    },
});
