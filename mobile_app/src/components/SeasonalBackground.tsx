import React from 'react';
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native';

const rainImg = require('../../assets/images/good.png');
const floodImg = require('../../assets/images/flood.png');
const droughtImg = require('../../assets/images/drought.png');

interface SeasonalBackgroundProps {
    type: 'rain' | 'flood' | 'drought';
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
}

const SeasonalBackground: React.FC<SeasonalBackgroundProps> = ({ type, children, style }) => {
    let source = rainImg;
    if (type === 'flood') source = floodImg;
    if (type === 'drought') source = droughtImg;

    return (
        <ImageBackground source={source} style={[styles.background, style]} imageStyle={styles.image}>
            {children}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
    }
});

export default SeasonalBackground;