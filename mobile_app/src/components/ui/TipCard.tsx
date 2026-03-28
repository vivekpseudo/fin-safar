import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Lightbulb, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface TipCardProps {
    tipId: number;
    onClose: () => void;
}

export const TipCard: React.FC<TipCardProps> = ({ tipId, onClose }) => {
    const { t } = useTranslation();
    const slideAnim = useRef(new Animated.Value(20)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const tip = t(`tips.t${tipId}`);

    return (
        <Animated.View style={[
            styles.container,
            {
                opacity: opacityAnim,
                transform: [{ translateY: slideAnim }]
            }
        ]}>
            <View style={styles.leftBorder} />
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Lightbulb size={20} color="#ea580c" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{t('settings.dailyTips')}</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <X size={16} color="#fdba74" />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff7ed',
        borderRadius: 12,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        marginBottom: 24,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        overflow: 'hidden',
    },
    leftBorder: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#f97316',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        paddingLeft: 20,
    },
    iconContainer: {
        backgroundColor: '#ffedd5',
        padding: 8,
        borderRadius: 20,
        marginRight: 12,
        marginTop: 4,
        alignSelf: 'flex-start'
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        color: '#9a3412',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    tipText: {
        color: '#334155',
        fontWeight: '500',
        marginTop: 4,
        fontSize: 14,
        lineHeight: 20,
    },
    closeButton: {
        padding: 16,
    }
});