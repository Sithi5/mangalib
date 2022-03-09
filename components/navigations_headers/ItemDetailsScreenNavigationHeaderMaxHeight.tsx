import {
    DARK_GREY,
    DEFAULT_MARGIN,
    ITEM_DETAILS_HEADER_MAX_HEIGHT,
    ITEM_DETAILS_HEADER_MIN_HEIGHT,
} from 'globals/AppStyles';
import { SearchStackNavigationProps } from 'navigations/NavigationsTypes';
import React from 'react';
import {
    Animated,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    navigation: SearchStackNavigationProps<'ItemDetails'>;
    translate_header: Animated.AnimatedMultiplication;
    fade_out_background_image: Animated.AnimatedInterpolation;
    header_diff_clamp: Animated.AnimatedDiffClamp;
    image_url: string | undefined;
    back_icon_color: Animated.AnimatedInterpolation;
    header_text_color: Animated.AnimatedInterpolation;
    item_title_text_left_pos: Animated.AnimatedInterpolation;
    item_title: string;
};

export default function ItemDetailsScreenNavigationHeaderMaxHeight(
    props: Props
) {
    const {
        translate_header,
        image_url,
        fade_out_background_image,
        navigation,
        header_diff_clamp,
        back_icon_color,
        header_text_color,
        item_title_text_left_pos,
        item_title,
    } = props;
    return (
        <View
            style={[
                styles.header_main_container,
                {
                    height: ITEM_DETAILS_HEADER_MAX_HEIGHT,
                },
            ]}
        >
            <Animated.View
                style={{
                    flex: 1,
                    transform: [
                        {
                            translateY: translate_header,
                        },
                    ],
                }}
            >
                <ImageBackground
                    source={
                        image_url !== ''
                            ? { uri: image_url }
                            : require('images/default_image.png')
                    }
                    style={styles.image_background}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: fade_out_background_image,
                        }}
                    >
                        <Animated.View
                            style={[
                                styles.top_elems_container,
                                {
                                    top: header_diff_clamp,
                                },
                            ]}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <Animated.Image
                                    style={[
                                        styles.back_button_icon,

                                        {
                                            width: 35,
                                            height: 35,
                                            tintColor: back_icon_color,
                                        },
                                    ]}
                                    source={require('images/icon_back.png')}
                                />
                            </TouchableOpacity>
                        </Animated.View>

                        <View style={styles.bottom_elems_container}>
                            <Animated.Text
                                numberOfLines={1}
                                style={[
                                    styles.item_title_text,
                                    {
                                        color: header_text_color,
                                        left: item_title_text_left_pos,
                                    },
                                ]}
                            >
                                {item_title.length < 30
                                    ? item_title
                                    : item_title.substring(0, 27) + '...'}
                            </Animated.Text>
                        </View>
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    header_main_container: {
        flex: 1,
    },
    image_background: {
        flex: 1,
    },
    item_title_text: {
        fontSize: 20,
        color: DARK_GREY,
        fontFamily: 'Rubik-SemiBold',
    },
    top_elems_container: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back_button_icon: {
        padding: 10,
        top: 8,
    },
    bottom_elems_container: {
        position: 'absolute',
        bottom: ITEM_DETAILS_HEADER_MIN_HEIGHT / 6,
        left: 20,
        margin: DEFAULT_MARGIN,
    },
});
