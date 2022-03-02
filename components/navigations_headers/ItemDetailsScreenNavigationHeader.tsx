import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import {
    DARK_GREY,
    DEFAULT_MARGIN,
    WHITE,
    WINDOW_HEIGHT,
} from 'globals/AppStyles';
import { SearchStackNavigationProps } from 'navigations/NavigationsTypes';
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    navigation: SearchStackNavigationProps<'ItemDetails'>;
    item_title: string;
    image_url: string;
    on_scroll: boolean;
};

export default function ItemDetailsScreenNavigationHeader(props: Props) {
    const { navigation, item_title, image_url, on_scroll } = props;

    return (
        <View style={styles.header_main_component}>
            <ImageBackground
                source={
                    image_url !== ''
                        ? { uri: image_url }
                        : require('images/default_image.png')
                }
                style={styles.image_background}
            >
                <View style={styles.background_darker}>
                    <View style={styles.top_elems_container}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Ionicons
                                style={[
                                    styles.back_button_icon,
                                    on_scroll
                                        ? { color: DARK_GREY }
                                        : { color: WHITE },
                                ]}
                                name="arrow-back-outline"
                                size={25}
                                color={WHITE}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => {}}>
                            <Ionicons
                                style={styles.option_button_icon}
                                name="ellipsis-vertical"
                                size={25}
                                color={WHITE}
                            />
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.bottom_elems_container}>
                        <Text numberOfLines={1} style={styles.item_title_text}>
                            {item_title.length < 30
                                ? item_title
                                : item_title.substring(0, 27) + '...'}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    header_main_component: {
        marginTop: Constants.statusBarHeight,
        backgroundColor: WHITE,
        flex: 1,
    },
    image_background: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: WINDOW_HEIGHT / 3.5,
        flex: 1,
    },
    background_darker: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0, 0.80)',
    },
    background_all_white: {
        flex: 1,
        backgroundColor: WHITE,
    },
    item_title_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: WHITE,
    },
    top_elems_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back_button_icon: {
        padding: 10,
    },
    option_button_icon: {
        padding: 10,
    },
    bottom_elems_container: {
        position: 'absolute',
        bottom: 10,
        left: 20,
        margin: DEFAULT_MARGIN,
    },
});
