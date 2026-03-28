import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const RainDrop = ({ x }) => {
    const translateY = useSharedValue(-50);

    React.useEffect(() => {
        translateY.value = withRepeat(
            withTiming(height + 50, { duration: 1000 }),
            -1
        );
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.drop,
                style,
                { left: x }
            ]}
        />
    );
};

export default function RainAnimation() {
    return (
        <View style={StyleSheet.absoluteFill}>
            {Array.from({ length: 30 }).map((_, i) => (
                <RainDrop key={i} x={Math.random() * width} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    drop: {
        position: 'absolute',
        width: 2,
        height: 15,
        backgroundColor: '#4aa3ff',
        opacity: 0.6,
    },
});