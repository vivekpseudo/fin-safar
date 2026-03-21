import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TrendingUp, BookOpen, Minus, Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface YoungAdultModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const YoungAdultModule: React.FC<YoungAdultModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [age, setAge] = useState(25);
    const [monthlyInvest, setMonthlyInvest] = useState(1000);

    const calculateCorpus = (startAge: number, investment: number) => {
        const r = 0.01; // 1% monthly
        const years = 60 - startAge;
        const n = years * 12;
        if (n <= 0) return 0;
        const corpus = investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        return Math.round(corpus);
    };

    const currentCorpus = calculateCorpus(age, monthlyInvest);

    useEffect(() => {
        if (currentCorpus > 2000000 && age < 30) {
            onComplete(100, "Wealth Wizard");
        }
    }, [age, monthlyInvest, currentCorpus, onComplete]);

    const incrementAge = () => setAge(a => Math.min(50, a + 1));
    const decrementAge = () => setAge(a => Math.max(20, a - 1));

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <TrendingUp size={20} color="#3730a3" />
                    <Text style={styles.introTitle}>{t('modules.young_adult.mission')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('modules.young_adult.desc')}</Text>
            </View>

            <View style={styles.controlsContainer}>
                {/* Age Control */}
                <View style={styles.controlGroup}>
                    <Text style={styles.label}>{t('modules.young_adult.startAge', { age })}</Text>
                    
                    <View style={styles.ageSelector}>
                        <TouchableOpacity onPress={decrementAge} style={styles.ageButton}>
                            <Minus size={24} color="#4f46e5" />
                        </TouchableOpacity>
                        
                        <View style={styles.ageDisplay}>
                            <Text style={styles.ageNumber}>{age}</Text>
                            <Text style={styles.ageText}>YRS</Text>
                        </View>
                        
                        <TouchableOpacity onPress={incrementAge} style={styles.ageButton}>
                            <Plus size={24} color="#4f46e5" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Investment Control */}
                <View style={styles.controlGroup}>
                    <Text style={styles.label}>{t('modules.young_adult.monthly', { amt: monthlyInvest })}</Text>
                    
                    <View style={styles.investOptionsGrid}>
                        {[500, 1000, 5000, 10000].map(amt => (
                            <TouchableOpacity
                                key={amt}
                                onPress={() => setMonthlyInvest(amt)}
                                style={[
                                    styles.investButton, 
                                    monthlyInvest === amt ? styles.investButtonActive : styles.investButtonInactive
                                ]}
                            >
                                <Text style={[
                                    styles.investButtonText, 
                                    monthlyInvest === amt ? styles.investButtonTextActive : styles.investButtonTextInactive
                                ]}>
                                    ₹{amt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Result Display */}
                <View style={styles.resultCard}>
                    <Text style={styles.resultLabel}>{t('modules.young_adult.corpus')}</Text>
                    <View style={styles.corpusContainer}>
                        <Text style={styles.corpusCurrency}>₹</Text>
                        <Text style={styles.corpusValue}>{(currentCorpus / 100000).toFixed(2)}</Text>
                        <Text style={styles.corpusSuffix}>{t('modules.young_adult.lakhs')}</Text>
                    </View>
                    <Text style={styles.disclaimerText}>{t('modules.young_adult.disclaimer')}</Text>
                </View>

                {/* Lesson */}
                <View style={styles.lessonCard}>
                    <BookOpen size={20} color="#854d0e" style={styles.lessonIcon} />
                    <Text style={styles.lessonText}>
                        <Text style={styles.lessonBold}>Lesson: </Text>
                        {t('modules.young_adult.lesson')}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    introCard: {
        backgroundColor: '#eef2ff',
        borderLeftWidth: 4,
        borderLeftColor: '#6366f1',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
    },
    introHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    introTitle: {
        fontWeight: 'bold',
        color: '#3730a3',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#4338ca',
    },
    controlsContainer: {
        gap: 24,
    },
    controlGroup: {
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 16,
    },
    ageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    ageButton: {
        backgroundColor: '#e0e7ff',
        padding: 12,
        borderRadius: 30,
    },
    ageDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingHorizontal: 32,
    },
    ageNumber: {
        fontSize: 48,
        fontWeight: '900',
        color: '#1e293b',
    },
    ageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#94a3b8',
        marginLeft: 4,
    },
    investOptionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    investButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 30,
        minWidth: '45%',
        alignItems: 'center',
    },
    investButtonActive: {
        backgroundColor: '#4f46e5',
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    investButtonInactive: {
        backgroundColor: '#f1f5f9',
    },
    investButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    investButtonTextActive: {
        color: '#ffffff',
    },
    investButtonTextInactive: {
        color: '#475569',
    },
    resultCard: {
        backgroundColor: '#0f172a',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    resultLabel: {
        color: '#94a3b8',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 12,
    },
    corpusContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    corpusCurrency: {
        color: '#4ade80',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 4,
    },
    corpusValue: {
        color: '#4ade80',
        fontSize: 48,
        fontWeight: '900',
    },
    corpusSuffix: {
        color: '#4ade80',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    disclaimerText: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 16,
        textAlign: 'center',
    },
    lessonCard: {
        backgroundColor: '#fefce8',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: 8,
    },
    lessonIcon: {
        marginTop: 2,
        marginRight: 8,
    },
    lessonText: {
        flex: 1,
        color: '#854d0e',
        lineHeight: 20,
    },
    lessonBold: {
        fontWeight: 'bold',
    }
});
