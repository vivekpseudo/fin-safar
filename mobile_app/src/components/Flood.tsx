import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

const Flood = () => {
    const waterLevel = useSharedValue(400);

    React.useEffect(() => {
        waterLevel.value = withTiming(200, { duration: 3000 });
    }, []);

    const style = useAnimatedStyle(() => ({
        transform: [{ translateY: waterLevel.value }],
    }));

    return (
        <Animated.View style={[styles.water, style]} />
    );
};

const styles = StyleSheet.create({
    water: {
        position: 'absolute',
        width: '100%',
        height: 300,
        backgroundColor: '#1e90ff',
        bottom: 0,
    },
});

export default Flood;
