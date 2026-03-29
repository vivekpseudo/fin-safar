import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Sprout, Home as HomeIcon, BookOpen, Briefcase, Trophy, ShieldCheck, Coins, TrendingUp } from 'lucide-react-native';
import { Badge } from '../components/ui/Badge';
import { TipCard } from '../components/ui/TipCard';
import { useTranslation } from 'react-i18next';
import kisan from "../../assets/images/kisan.png";
import student from "../../assets/images/student.png";
import woman from "../../assets/images/woman.png";
import professional from "../../assets/images/professional.png";

interface HomePageProps {
    userState: any;
    showTip: boolean;
    setShowTip: (show: boolean) => void;
    selectPersona: (id: string) => void;
}

const Personas = [
    { id: 'farmer', icon: Sprout, color: '#16a34a', bg: '#f0fdf4', bgImg: kisan }, // green
    { id: 'woman', icon: HomeIcon, color: '#9333ea', bg: '#faf5ff', bgImg: woman }, // purple
    { id: 'student', icon: BookOpen, color: '#2563eb', bg: '#eff6ff', bgImg: student }, // blue
    { id: 'young_adult', icon: Briefcase, color: '#4f46e5', bg: '#eef2ff', bgImg: professional }, // indigo
];

export const HomePage: React.FC<HomePageProps> = ({ userState, showTip, setShowTip, selectPersona }) => {
    const { t } = useTranslation();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
                <Text style={styles.subtitleText}>{t('home.subtitle')}</Text>

                {userState.notifications?.dailyTips && showTip && (
                    <View style={styles.tipWrapper}>
                        <TipCard onClose={() => setShowTip(false)} />
                    </View>
                )}
            </View>

            <View style={styles.grid}>
                {Personas.map((p) => {
                    const keyMap: Record<string, string> = {
                        'young_adult': 'professional'
                    };
                    const langKey = keyMap[p.id] || p.id;

                    return (
                        <TouchableOpacity
                            key={p.id}
                            onPress={() => selectPersona(p.id)}
                            style={styles.card}
                            activeOpacity={0.7}
                        >
                            <ImageBackground

                                style={styles.cardBgImg}
                                imageStyle={styles.cardBgImg}
                                source={p.bgImg}>

                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>{t(`home.personas.${langKey}.title`)}</Text>
                                    <Text style={styles.cardDesc}>{t(`home.personas.${langKey}.desc`)}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* BADGES SHOWCASE */}
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
        marginTop: 50,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitleText: {
        fontSize: 16,
        color: '#475569',
        marginBottom: 24,
        textAlign: 'center'
    },
    tipWrapper: {
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ea580c',
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        padding: 16,

    },
    iconContainer: {
        padding: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    textContainer: {
        flex: 1,
        marginTop: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 12,
        color: '#64748b',
        lineHeight: 16,
    },
    cardBgImg: {
        width: '100%',
        resizeMode: 'stretch',
    },
    badgesSection: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        marginTop: 8,
    },
    badgesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    badgesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        marginLeft: 8,
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
    }
});
