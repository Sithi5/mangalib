import {
    BACKGROUND_DARK_OPACITY,
    BACKGROUND_WHITE_OPACITY,
    GREY,
    ITEM_DETAILS_HEADER_MAX_HEIGHT,
    ITEM_DETAILS_HEADER_MIN_HEIGHT,
    ITEM_DETAILS_HEADER_SCROLL_DISTANCE,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import { SearchStackNavigationProps } from 'navigations/NavigationsTypes';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import ItemDetailsScreenNavigationHeaderMaxHeight from './ItemDetailsScreenNavigationHeaderMaxHeight';
import ItemDetailsScreenNavigationHeaderMinHeight from './ItemDetailsScreenNavigationHeaderMinHeight';

type Props = {
    navigation: SearchStackNavigationProps<'ItemDetails'>;
    item_title: string;
    image_url: string;
    scroll: Animated.Value;
    updateHeaderZIndex: any;
};

const FADE_DURATION = 750;

export default function ItemDetailsScreenNavigationHeader(props: Props) {
    const { navigation, item_title, image_url, scroll, updateHeaderZIndex } =
        props;

    const [header_height, setHeaderHeight] = useState(
        ITEM_DETAILS_HEADER_MAX_HEIGHT
    );

    const fade_out_anim = useRef(new Animated.Value(0)).current;
    const had_fade_in = useRef(false);

    const header_diff_clamp = Animated.diffClamp(
        scroll,
        0,
        ITEM_DETAILS_HEADER_SCROLL_DISTANCE
    );

    const fade_out_background_image = fade_out_anim.interpolate({
        inputRange: [0, 1],
        outputRange: [BACKGROUND_DARK_OPACITY, BACKGROUND_WHITE_OPACITY],
    });

    const item_title_text_left_pos = header_diff_clamp.interpolate({
        inputRange: [0, ITEM_DETAILS_HEADER_SCROLL_DISTANCE],
        outputRange: [0, 20],
    });

    const header_text_color = fade_out_anim.interpolate({
        inputRange: [0, 1],
        outputRange: [WHITE, ORANGE],
    });

    const back_icon_color = fade_out_anim.interpolate({
        inputRange: [0, 1],
        outputRange: [WHITE, GREY],
    });

    const translate_header = Animated.multiply(header_diff_clamp, -1);

    useEffect(() => {
        scroll.addListener(({ value }) => {
            if (
                value > ITEM_DETAILS_HEADER_SCROLL_DISTANCE &&
                !had_fade_in.current
            ) {
                Animated.timing(fade_out_anim, {
                    toValue: 1,
                    duration: FADE_DURATION,
                    useNativeDriver: false,
                }).start();
                had_fade_in.current = true;
                setHeaderHeight(ITEM_DETAILS_HEADER_MIN_HEIGHT);
                updateHeaderZIndex(2);
            }
            if (
                value < ITEM_DETAILS_HEADER_SCROLL_DISTANCE &&
                had_fade_in.current
            ) {
                Animated.timing(fade_out_anim, {
                    toValue: 0,
                    duration: FADE_DURATION,
                    useNativeDriver: false,
                }).start();
                had_fade_in.current = false;
                setHeaderHeight(ITEM_DETAILS_HEADER_MAX_HEIGHT);
                updateHeaderZIndex(0);
            }
        });
        return () => {
            scroll.removeAllListeners();
        };
    }, []);

    //Render Two different header if header size is MAX or MIN
    if (header_height === ITEM_DETAILS_HEADER_MAX_HEIGHT) {
        return (
            <ItemDetailsScreenNavigationHeaderMaxHeight
                navigation={navigation}
                fade_out_background_image={fade_out_background_image}
                header_diff_clamp={header_diff_clamp}
                back_icon_color={back_icon_color}
                header_text_color={header_text_color}
                item_title={item_title}
                translate_header={translate_header}
                image_url={image_url}
                item_title_text_left_pos={item_title_text_left_pos}
            />
        );
    } else {
        return (
            <ItemDetailsScreenNavigationHeaderMinHeight
                navigation={navigation}
                fade_out_background_image={fade_out_background_image}
                back_icon_color={back_icon_color}
                header_text_color={header_text_color}
                item_title={item_title}
                image_url={image_url}
            />
        );
    }
}

const styles = StyleSheet.create({});
