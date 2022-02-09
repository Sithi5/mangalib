import { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

type Props = {
    children: React.ReactChild;
};

export default function FadeIn(props: Props) {
    const fadein_anim = useRef(
        new Animated.Value(Dimensions.get('window').width)
    ).current;

    useEffect(() => {
        Animated.spring(fadein_anim, {
            toValue: 0,
            bounciness: 7,
            useNativeDriver: false,
        }).start();
    });

    return (
        <Animated.View style={{ left: fadein_anim }}>
            {props.children}
        </Animated.View>
    );
}
