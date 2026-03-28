import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Languages } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export interface Language {
    code: string;
    label: string;
    native: string;
}

interface LanguageSelectionProps {
    onSelect: (lang: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect }) => {
    const { t } = useTranslation();
    const slideAnim = useRef(new Animated.Value(20)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;


    const languages: Language[] = [
        { code: 'en', label: 'English', native: 'English' },
        { code: 'hi', label: 'Hindi', native: 'हिंदी' },
        { code: 'mr', label: 'Marathi', native: 'मराठी' },
        { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
        { code: 'te', label: 'Telugu', native: 'తెలుగు' },
        { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
        { code: 'bn', label: 'Bengali', native: 'বাংলা' },
        { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
        { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
        { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
        { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
        { code: 'ur', label: 'Urdu', native: 'اردو' },
        { code: 'as', label: 'Assamese', native: 'অসমীয়া' },
        { code: 'br', label: 'Bodo', native: 'बड़ो' },
        { code: 'do', label: 'Dogri', native: 'डोगरी' },
        { code: 'ks', label: 'Kashmiri', native: 'कश्मीरी' },
        { code: 'ko', label: 'Konkani', native: 'कोंकणी' },
        { code: 'mai', label: 'Maithili', native: 'मैथिली' },
        { code: 'mni', label: 'Manipuri (Meitei)', native: 'ꯃꯩꯇꯩ ꯂꯣꯟ' },
        { code: 'ne', label: 'Nepali', native: 'नेपाली' },
        { code: 'sa', label: 'Sanskrit', native: 'संस्कृत' },
        { code: 'sat', label: 'Santhali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
        { code: 'sd', label: 'Sindhi', native: 'सिन्धी' },
    ];

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

    return (
        <Animated.View style={[styles.container, { opacity: opacityAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.headerContainer}>
                <View style={styles.titleRow}>
                    <Languages size={24} color="#ea580c" />
                    <Text style={styles.title}>{t('language.select')}</Text>
                </View>
                <Text style={styles.subtitle}>{t('language.choose')}</Text>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.grid}>
                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            onPress={() => onSelect(lang)}
                            style={styles.card}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.nativeText}>{lang.native}</Text>
                            <Text style={styles.label}>{lang.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 24,
    },
    headerContainer: {
        marginBottom: 24,
        marginTop: 50,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#ffffff',
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    nativeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        color: '#94a3b8',
    }
});
