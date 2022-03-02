import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import {
    BACKGROUND_DARK_OPACITY,
    BACKGROUND_WHITE_OPACITY,
    DARK_GREY,
    DEFAULT_MARGIN,
    WHITE,
    WINDOW_HEIGHT,
} from 'globals/AppStyles';
import { SearchStackNavigationProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
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
    scroll: Animated.Value;
};

const HEADER_MAX_HEIGHT = WINDOW_HEIGHT / 3.5;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ItemDetailsScreenNavigationHeader(props: Props) {
    const [on_scroll, setOnScroll] = useState(false);
    const can_fade_in = useRef(true);
    const { navigation, item_title, image_url, scroll } = props;
    const fade_out_anim = useRef(new Animated.Value(0)).current;
    const header_diff_clamp = Animated.diffClamp(
        scroll,
        0,
        HEADER_SCROLL_DISTANCE
    );
    const fade_out_background_image = fade_out_anim.interpolate({
        inputRange: [0, 1],
        outputRange: [BACKGROUND_DARK_OPACITY, BACKGROUND_WHITE_OPACITY],
    });
    const translate_header = Animated.multiply(header_diff_clamp, -1);

    scroll.addListener(({ value }) => {
        if (value > 0) {
            setOnScroll(true);
        } else {
            setOnScroll(false);
        }
        if (value > HEADER_MIN_HEIGHT && can_fade_in) {
            Animated.timing(fade_out_anim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }).start();
            can_fade_in.current = false;
        }
    });

    return (
        <View>
            <Animated.View
                style={[
                    styles.header_main_container,
                    { transform: [{ translateY: translate_header }] },
                ]}
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
                            <Text
                                numberOfLines={1}
                                style={styles.item_title_text}
                            >
                                {item_title.length < 30
                                    ? item_title
                                    : item_title.substring(0, 27) + '...'}
                            </Text>
                        </View>
                    </Animated.View>
                </ImageBackground>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    header_main_container: {
        height: HEADER_MAX_HEIGHT,
        flex: 1,
    },

    image_background: {
        resizeMode: 'cover',
        justifyContent: 'center',
        flex: 1,
    },
    background_darker: {
        flex: 1,
        backgroundColor: BACKGROUND_DARK_OPACITY,
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
