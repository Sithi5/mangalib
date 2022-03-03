import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import {
    BACKGROUND_DARK_OPACITY,
    BACKGROUND_WHITE_OPACITY,
    BLACK,
    DARK_GREY,
    DEFAULT_MARGIN,
    GREY,
    LIGHT_GREY,
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

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const FADE_DURATION = 750;

export default function ItemDetailsScreenNavigationHeader(props: Props) {
    const [on_scroll, setOnScroll] = useState(false);
    const had_fade_in = useRef(false);
    const last_scroll_value = useRef(0);
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
    const header_text_color = fade_out_anim.interpolate({
        inputRange: [0, 1],
        outputRange: [WHITE, BLACK],
    });

    const translate_header = Animated.multiply(header_diff_clamp, -1);

    useEffect(() => {
        scroll.addListener(({ value }) => {
            if (value > 0) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
            if (
                value > HEADER_SCROLL_DISTANCE - HEADER_MIN_HEIGHT &&
                !had_fade_in.current
            ) {
                Animated.timing(fade_out_anim, {
                    toValue: 1,
                    duration: FADE_DURATION,
                    useNativeDriver: false,
                }).start();
                had_fade_in.current = true;
            }
            if (value < last_scroll_value.current) {
                // Scrolling up
                if (had_fade_in.current) {
                    Animated.timing(fade_out_anim, {
                        toValue: 0,
                        duration: FADE_DURATION,
                        useNativeDriver: false,
                    }).start();
                    had_fade_in.current = false;
                }
            }

            if (last_scroll_value.current != value) {
                last_scroll_value.current = value;
            }
        });
        return () => {
            scroll.removeAllListeners();
        };
    }, []);

    return (
        <View>
            <Animated.View
                style={[
                    styles.header_main_container,
                    {
                        transform: [{ translateY: translate_header }],
                    },
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
                            <Animated.Text
                                numberOfLines={1}
                                style={[
                                    styles.item_title_text,
                                    { color: header_text_color },
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
        height: HEADER_MAX_HEIGHT,
        borderBottomColor: LIGHT_GREY,
        borderBottomWidth: 1,
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
