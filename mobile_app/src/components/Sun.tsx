import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const Sun = () => {
    const scale = useSharedValue(1);

    React.useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.3, { duration: 1500 }),
            -1,
            true
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return <Animated.View style={[styles.sun, style]} />;
};

const styles = StyleSheet.create({
    sun: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'orange',
        position: 'absolute',
        top: 50,
        right: 30,
    },
});

export default Sun;
