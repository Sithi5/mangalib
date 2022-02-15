import React, { useRef } from 'react';
import { Animated, Button, StyleSheet, View, PanResponder } from 'react-native';

export default function TestScreen() {
    const pan = useRef(new Animated.ValueXY()).current;
    const fade_anim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 1

    const pan_responder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                const touches = evt.nativeEvent.touches;
                if (touches.length == 1) {
                    return Animated.event(
                        [
                            null, // raw event arg ignored
                            { dx: pan.x, dy: pan.y }, // gestureState arg
                        ],
                        { useNativeDriver: false }
                    )(evt, gestureState);
                }
            },
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        })
    ).current;

    function fade() {
        Animated.sequence([
            Animated.timing(fade_anim, {
                toValue: 0,
                useNativeDriver: false,
                duration: 3000,
            }),
            Animated.timing(fade_anim, {
                toValue: 1,
                useNativeDriver: false,
                duration: 3000,
            }),
        ]).start();
    }

    return (
        <View style={styles.main_container}>
            <Button title="Click to fade" onPress={fade}></Button>

            <Animated.View
                style={{
                    ...pan.getLayout(),
                    ...styles.animation_view,
                    opacity: fade_anim,
                }}
                {...pan_responder.panHandlers}
            ></Animated.View>
        </View>
    );
}
const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation_view: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
});
