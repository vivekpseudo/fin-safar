import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Smartphone, Trophy, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface OnboardingCarouselProps {
    onNext: () => void;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onNext }) => {
    const { t } = useTranslation();
    const [slide, setSlide] = useState(0);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(20)).current;

    const slides = [
        {
            title: t('carousel.slide1.title'),
            desc: t('carousel.slide1.desc'),
            icon: <Smartphone size={64} color="#f97316" />, // orange-500
            color: '#fff7ed', // orange-50
        },
        {
            title: t('carousel.slide2.title'),
            desc: t('carousel.slide2.desc'),
            icon: <Trophy size={64} color="#eab308" />, // yellow-500
            color: '#fefce8', // yellow-50
        },
        {
            title: t('carousel.slide3.title'),
            desc: t('carousel.slide3.desc'),
            icon: <ShieldCheck size={64} color="#22c55e" />, // green-500
            color: '#f0fdf4', // green-50
        }
    ];

    useEffect(() => {
        // Reset animations on slide change
        fadeAnim.setValue(0);
        slideUpAnim.setValue(20);

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, [slide]);

    const handleNext = () => {
        if (slide < slides.length - 1) {
            setSlide(s => s + 1);
        } else {
            onNext();
        }
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ translateY: slideUpAnim }] }]}>
                <View style={[styles.iconContainer, { backgroundColor: slides[slide].color }]}>
                    {slides[slide].icon}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{slides[slide].title}</Text>
                    <Text style={styles.desc}>{slides[slide].desc}</Text>
                </View>
            </Animated.View>

            <View style={styles.footerContainer}>
                <View style={styles.dotsContainer}>
                    {slides.map((_, i) => (
                        <View key={i} style={[styles.dot, i === slide ? styles.activeDot : styles.inactiveDot]} />
                    ))}
                </View>

                <Button onClick={handleNext}>
                    <Text style={styles.buttonText}>{slide === slides.length - 1 ? t('carousel.getStarted') : t('carousel.next')}</Text>
                    <ArrowRight size={20} color="#ffffff" style={styles.buttonIcon} />
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 24,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        padding: 32,
        borderRadius: 100,
        marginBottom: 32,
    },
    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 16,
    },
    desc: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 24,
    },
    footerContainer: {
        marginBottom: 32,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    activeDot: {
        width: 32,
        backgroundColor: '#ea580c', // orange-600
    },
    inactiveDot: {
        width: 8,
        backgroundColor: '#e2e8f0', // slate-200
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
    },
    buttonIcon: {
        marginLeft: 8,
    }
});
