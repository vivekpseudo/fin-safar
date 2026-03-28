import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Sprout, Home as HomeIcon, BookOpen, Briefcase, Trophy, ShieldCheck, Coins, TrendingUp } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from '../components/ui/Badge';
import { TipCard } from '../components/ui/TipCard';
import { useTranslation } from 'react-i18next';
import { getTodayTipId } from '../data/tips';

interface HomePageProps {
    userState: any;
    selectPersona?: (id: string) => void;
}

const Personas = [
    { id: 'farmer', icon: Sprout, color: '#16a34a', bg: '#f0fdf4', langKey: 'farmer' },
    { id: 'woman', icon: HomeIcon, color: '#9333ea', bg: '#faf5ff', langKey: 'woman' },
    { id: 'student', icon: BookOpen, color: '#2563eb', bg: '#eff6ff', langKey: 'student' },
    { id: 'young_adult', icon: Briefcase, color: '#4f46e5', bg: '#eef2ff', langKey: 'professional' },
];

const getTodayKey = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
};

export const HomePage: React.FC<HomePageProps> = ({ userState }) => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const [showTip, setShowTip] = useState(false);
    const todayTipId = getTodayTipId();

    useEffect(() => {
        checkTipVisibility();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkTipVisibility = async () => {
        try {
            const todayKey = getTodayKey();
            const dismissed = await AsyncStorage.getItem(`tip-dismissed-${todayKey}`);
            if (!dismissed && userState.notifications?.dailyTips) {
                setShowTip(true);
            }
        } catch {
            if (userState.notifications?.dailyTips) {
                setShowTip(true);
            }
        }
    };

    const handleDismissTip = async () => {
        try {
            const todayKey = getTodayKey();
            await AsyncStorage.setItem(`tip-dismissed-${todayKey}`, 'true');
            setShowTip(false);
        } catch {
            setShowTip(false);
        }
    };

   const handleSelectPersona = (id: string) => {
     console.log("NAVIGATING TO:", id);
    navigation.navigate('ModuleParams', { personaId: id });
};
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
                <Text style={styles.subtitleText}>{t('home.subtitle')}</Text>

                {userState.notifications?.dailyTips && showTip && (
                    <View style={styles.tipWrapper}>
                        <TipCard tipId={todayTipId} onClose={handleDismissTip} />
                    </View>
                )}
            </View>

            <View style={styles.grid}>
                {Personas.map((p) => (
                    <TouchableOpacity
                        key={p.id}
                        onPress={() => handleSelectPersona(p.id)}
                        style={styles.card}
                        activeOpacity={0.7}
                    >
                   <View style={[styles.iconContainer, { backgroundColor: p.bg }]}>
    <p.icon size={28} color={p.color} />
</View>
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>
                                {t(`home.personas.${p.langKey}.title`)}
                            </Text>
                            <Text style={styles.cardDesc}>
                                {t(`home.personas.${p.langKey}.desc`)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

           <View style={styles.badgesSection}>
                <View style={styles.badgesHeader}>
                    <Trophy size={18} color="#eab308" />
                    <Text style={styles.badgesTitle}>{t('home.achievements')}</Text>
                </View>
                <View style={styles.badgesGrid}>
                    <View style={styles.badgeWrapper}>
                        <Badge icon={Sprout} label="Harvest" earned={userState.badges.includes("Harvest Hero")} />
                    </View>
                    <View style={styles.badgeWrapper}>
                        <Badge icon={ShieldCheck} label="Safe" earned={userState.badges.includes("Cyber Guardian") || userState.badges.includes("Safety Star")} />
                    </View>
                    <View style={styles.badgeWrapper}>
                        <Badge icon={Coins} label="Saver" earned={userState.badges.includes("Savings Scout")} />
                    </View>
                    <View style={styles.badgeWrapper}>
                        <Badge icon={TrendingUp} label="Wealthy" earned={userState.badges.includes("Wealth Wizard")} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        alignItems: 'center',
        marginVertical: 30,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 16,
        color: '#475569',
        marginBottom: 24,
        textAlign: 'center',
    },
    tipWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: '#64748b',
        lineHeight: 16,
    },
    badgesSection: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    badgesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    badgesTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
    },
    badgesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    badgeWrapper: {
        width: '48%',
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});