import {
    KitsuAnimeAttributes,
    KitsuData,
    KitsuMangaAttributes,
} from 'api/KitsuTypes';
import { BLACK } from 'globals/AppStyles';
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    item: KitsuData | undefined;
    item_type: 'manga' | 'anime';
};

export default function TopContainerItemDetailsContent(props: Props) {
    const { item, item_type } = props;
    if (item) {
        const item_attribute = item.attributes;
        return (
            <View style={styles.main_container}>
                <Text style={styles.item_details_text}>
                    Type: {item_attribute.subtype}
                </Text>
                <Text style={styles.item_details_text}>
                    Start date:{' '}
                    {moment(item_attribute.startDate).format('MMMM Do YYYY')}
                </Text>
                <Text style={styles.item_details_text}>
                    Status: {item_attribute.status}
                </Text>
                {item_attribute.status === 'finished' ? (
                    <Text style={styles.item_details_text}>
                        End date:{' '}
                        {item_attribute.endDate
                            ? moment(item_attribute.endDate).format(
                                  'MMMM Do YYYY'
                              )
                            : 'unknow'}
                    </Text>
                ) : null}
                {item_type == 'manga' ? (
                    <View>
                        <Text style={styles.item_details_text}>
                            Chapter count:{' '}
                            {
                                (item_attribute as KitsuMangaAttributes)
                                    .chapterCount
                            }
                        </Text>
                        <Text style={styles.item_details_text}>
                            Volume count:{' '}
                            {
                                (item_attribute as KitsuMangaAttributes)
                                    .volumeCount
                            }
                        </Text>
                        <Text style={styles.item_details_text}>
                            Serialization:{' '}
                            {
                                (item_attribute as KitsuMangaAttributes)
                                    .serialization
                            }
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.item_details_text}>
                            Episode count:{' '}
                            {
                                (item_attribute as KitsuAnimeAttributes)
                                    .episodeCount
                            }
                        </Text>
                        <Text style={styles.item_details_text}>
                            Episode Lenght:{' '}
                            {
                                (item_attribute as KitsuAnimeAttributes)
                                    .episodeLength
                            }{' '}
                            mins
                        </Text>
                    </View>
                )}
            </View>
        );
    } else {
        return null;
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'column',
        margin: 5,
        flex: 1,
    },
    item_details_text: {
        margin: 3,
        fontFamily: 'Rubik-Medium',
        color: BLACK,
    },
});
