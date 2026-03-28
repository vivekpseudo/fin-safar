import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    PanResponder,
    LayoutChangeEvent,
} from 'react-native';
import { TrendingUp, BookOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface YoungAdultModuleProps {
    onComplete: (score: number, badge: string) => void;
}

// Custom Slider Component
const CustomSlider: React.FC<{
    min: number;
    max: number;
    step: number;
    value: number;
    onValueChange: (val: number) => void;
}> = ({ min, max, step, value, onValueChange }) => {
    const trackWidth = useRef(0);

    const fraction = (value - min) / (max - min);

    const onLayout = (e: LayoutChangeEvent) => {
        trackWidth.current = e.nativeEvent.layout.width;
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const x = evt.nativeEvent.locationX;
                updateValue(x);
            },
            onPanResponderMove: (evt) => {
                const x = evt.nativeEvent.locationX;
                updateValue(x);
            },
        })
    ).current;

    const updateValue = (x: number) => {
        if (trackWidth.current === 0) return;
        const ratio = Math.max(0, Math.min(1, x / trackWidth.current));
        const raw = min + ratio * (max - min);
        const stepped = Math.round(raw / step) * step;
        const clamped = Math.max(min, Math.min(max, stepped));
        onValueChange(clamped);
    };

    return (
        <View
            style={sliderStyles.container}
            onLayout={onLayout}
            {...panResponder.panHandlers}
        >
            <View style={sliderStyles.track}>
                <View
                    style={[
                        sliderStyles.trackFilled,
                        { width: `${fraction * 100}%` },
                    ]}
                />
            </View>
            <View
                style={[
                    sliderStyles.thumb,
                    { left: `${fraction * 100}%` },
                ]}
            />
        </View>
    );
};

const sliderStyles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center',
        position: 'relative',
    },
    track: {
        height: 8,
        backgroundColor: '#e2e8f0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    trackFilled: {
        height: '100%',
        backgroundColor: '#4f46e5',
        borderRadius: 4,
    },
    thumb: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4f46e5',
        marginLeft: -12,
        top: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});

// Main Component
export const YoungAdultModule: React.FC<YoungAdultModuleProps> = ({  }) => {
    const { t } = useTranslation();
    const [age, setAge] = useState(25);
    const [monthlyInvest, setMonthlyInvest] = useState(1000);

    const calculateCorpus = (startAge: number, investment: number) => {
        const r = 0.01;
        const years = 60 - startAge;
        const n = years * 12;
        if (n <= 0) return 0;
        const corpus = investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        return Math.round(corpus);
    };

    const currentCorpus = calculateCorpus(age, monthlyInvest);

    
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Intro Card */}
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <TrendingUp size={20} color="#3730a3" />
                    <Text style={styles.introTitle}>{t('modules.young_adult.mission')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('modules.young_adult.desc')}</Text>
            </View>

            <View style={styles.sectionGap}>
                {/* Age Slider */}
                <View>
                    <Text style={styles.label}>
                        {t('modules.young_adult.startAge', { age })}
                    </Text>
                    <CustomSlider
                        min={20}
                        max={50}
                        step={1}
                        value={age}
                        onValueChange={setAge}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={styles.sliderLabelText}>20</Text>
                        <Text style={styles.sliderLabelText}>35</Text>
                        <Text style={styles.sliderLabelText}>50</Text>
                    </View>
                </View>

                {/* Monthly Investment Pills */}
                <View>
                    <Text style={styles.label}>
                        {t('modules.young_adult.monthly', { amt: monthlyInvest })}
                    </Text>
                    <View style={styles.investOptions}>
                        {[500, 1000, 5000, 10000].map(amt => (
                            <TouchableOpacity
                                key={amt}
                                onPress={() => setMonthlyInvest(amt)}
                                style={[
                                    styles.investPill,
                                    monthlyInvest === amt
                                        ? styles.investPillActive
                                        : styles.investPillInactive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.investPillText,
                                        monthlyInvest === amt
                                            ? styles.investPillTextActive
                                            : styles.investPillTextInactive,
                                    ]}
                                >
                                    ₹{amt}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Corpus Result */}
                <View style={styles.resultCard}>
                    <Text style={styles.resultLabel}>
                        {t('modules.young_adult.corpus')}
                    </Text>
                    <Text style={styles.corpusValue}>
                        ₹{(currentCorpus / 100000).toFixed(2)} {t('modules.young_adult.lakhs')}
                    </Text>
                    <Text style={styles.disclaimerText}>
                        {t('modules.young_adult.disclaimer')}
                    </Text>
                </View>

                {/* Lesson Card */}
                <View style={styles.lessonCard}>
                    <BookOpen size={16} color="#854d0e" style={styles.lessonIcon} />
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
        paddingBottom: 48,
    },
    sectionGap: {
        gap: 24,
    },

    /* Intro Card */
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
        gap: 8,
        marginBottom: 4,
    },
    introTitle: {
        fontWeight: '700',
        color: '#3730a3',
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#4338ca',
    },

    /* Label */
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        marginBottom: 8,
    },

    /* Slider Labels */
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    sliderLabelText: {
        fontSize: 12,
        color: '#94a3b8',
    },

    /* Investment Pills */
    investOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    investPill: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 9999,
    },
    investPillActive: {
        backgroundColor: '#4f46e5',
    },
    investPillInactive: {
        backgroundColor: '#f1f5f9',
    },
    investPillText: {
        fontSize: 14,
        fontWeight: '700',
    },
    investPillTextActive: {
        color: '#ffffff',
    },
    investPillTextInactive: {
        color: '#475569',
    },

    /* Result Card */
    resultCard: {
        backgroundColor: '#0f172a',
        padding: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    resultLabel: {
        color: '#94a3b8',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
    },
    corpusValue: {
        fontSize: 30,
        fontWeight: '700',
        color: '#4ade80',
    },
    disclaimerText: {
        color: '#64748b',
        fontSize: 12,
        marginTop: 8,
        textAlign: 'center',
    },

    /* Lesson Card */
    lessonCard: {
        backgroundColor: '#fefce8',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    lessonIcon: {
        marginTop: 2,
    },
    lessonText: {
        flex: 1,
        color: '#854d0e',
        fontSize: 14,
        lineHeight: 20,
    },
    lessonBold: {
        fontWeight: '700',
    },
});