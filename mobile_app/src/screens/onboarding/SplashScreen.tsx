import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { TrendingUp } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const { t } = useTranslation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim1 = useRef(new Animated.Value(0.3)).current;
    const pulseAnim2 = useRef(new Animated.Value(0.3)).current;
    const pulseAnim3 = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        // Fade In
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();

        // Bounce
        Animated.loop(
            Animated.sequence([
                Animated.timing(bounceAnim, { toValue: -15, duration: 400, useNativeDriver: true }),
                Animated.timing(bounceAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
            ])
        ).start();

        // Pulse
        const createPulse = (anim: Animated.Value, delay: number) => {
            return Animated.sequence([
                Animated.delay(delay),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }),
                        Animated.timing(anim, { toValue: 0.3, duration: 500, useNativeDriver: true })
                    ])
                )
            ]);
        };

        Animated.parallel([
            createPulse(pulseAnim1, 0),
            createPulse(pulseAnim2, 150),
            createPulse(pulseAnim3, 300),
        ]).start();

        const timer = setTimeout(() => {
            onFinish();
        }, 5000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Animated.View style={[styles.iconContainer, { transform: [{ translateY: bounceAnim }] }]}>
                <TrendingUp size={64} color="#ea580c" />
            </Animated.View>
            <Text style={styles.title}>FinSafar</Text>
            <Text style={styles.subtitle}>{t('splash.tagline')}</Text>

            <View style={styles.dotsContainer}>
                <Animated.View style={[styles.dot, { opacity: pulseAnim1 }]} />
                <Animated.View style={[styles.dot, { opacity: pulseAnim2 }]} />
                <Animated.View style={[styles.dot, { opacity: pulseAnim3 }]} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ea580c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ffedd5',
        letterSpacing: 0.5,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#ffffff',
        borderRadius: 4,
    },
});
