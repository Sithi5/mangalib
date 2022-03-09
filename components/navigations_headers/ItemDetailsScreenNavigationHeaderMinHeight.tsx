import {
    DARK_GREY,
    DEFAULT_MARGIN,
    ITEM_DETAILS_HEADER_MAX_HEIGHT,
    ITEM_DETAILS_HEADER_MIN_HEIGHT,
    ITEM_DETAILS_HEADER_SCROLL_DISTANCE,
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
    fade_out_background_image: Animated.AnimatedInterpolation;
    image_url: string | undefined;
    back_icon_color: Animated.AnimatedInterpolation;
    header_text_color: Animated.AnimatedInterpolation;
    item_title: string;
};

export default function ItemDetailsScreenNavigationHeaderMinHeight(
    props: Props
) {
    const {
        image_url,
        fade_out_background_image,
        navigation,
        back_icon_color,
        header_text_color,
        item_title,
    } = props;
    return (
        <View
            style={{
                marginBottom: ITEM_DETAILS_HEADER_SCROLL_DISTANCE,
            }}
        >
            <View
                style={{
                    position: 'absolute',
                    height: ITEM_DETAILS_HEADER_MAX_HEIGHT,
                    width: '100%',
                    marginTop: -ITEM_DETAILS_HEADER_SCROLL_DISTANCE,
                    zIndex: 0,
                    transform: [],
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
                    ></Animated.View>
                </ImageBackground>
            </View>
            <View
                style={[
                    styles.header_main_container,
                    {
                        height: ITEM_DETAILS_HEADER_MIN_HEIGHT,
                        zIndex: 1,
                        backgroundColor: 'transparent',
                    },
                ]}
            >
                <Animated.View style={styles.min_header_elem_container}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Animated.Image
                            style={[
                                {
                                    width: 35,
                                    height: 35,
                                    tintColor: back_icon_color,
                                },
                            ]}
                            source={require('images/icon_back.png')}
                        />
                    </TouchableOpacity>
                    <Animated.Text
                        numberOfLines={1}
                        style={[
                            styles.item_title_text,
                            {
                                left: 10,
                                color: header_text_color,
                            },
                        ]}
                    >
                        {item_title.length < 30
                            ? item_title
                            : item_title.substring(0, 27) + '...'}
                    </Animated.Text>
                </Animated.View>
            </View>
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
    min_header_elem_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
