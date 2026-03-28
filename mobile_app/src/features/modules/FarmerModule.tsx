import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Sprout, ShieldCheck, X, CloudRain, Sun, Trophy } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { MarketMandiGame } from '../games/MarketMandiGame';
import { useTranslation } from 'react-i18next';

interface FarmerModuleProps {
    onComplete: (score: number, badge: string) => void;
}

interface HarvestData {
    yieldQty: number;
    costs: number;
    cropLoss: number;
    insurancePayout: number;
    loanCost: number;
    insuranceCost: number;
}

export const FarmerModule: React.FC<FarmerModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState<'planning' | 'season' | 'result' | 'mandi' | 'final'>('planning');
    const [loanType, setLoanType] = useState<'bank' | 'moneylender' | null>(null);
    const [insurance, setInsurance] = useState<boolean | null>(null);
    const [weather, setWeather] = useState<'good' | 'drought' | null>(null);
    const [harvestData, setHarvestData] = useState<HarvestData>({ yieldQty: 0, costs: 0, cropLoss: 0, insurancePayout: 0, loanCost: 0, insuranceCost: 0 });
    const [finalProfit, setFinalProfit] = useState(0);

    const calculateHarvest = () => {
        const isDrought = Math.random() > 0.5;
        setWeather(isDrought ? 'drought' : 'good');

        const baseQty = 2000;
        let loanCost = loanType === 'moneylender' ? 15000 : 5000;
        let insuranceCost = insurance ? 2000 : 0;

        let actualQty = isDrought ? baseQty * 0.4 : baseQty;
        let _cropLossValue = isDrought ? (insurance ? 0 : 20000) : 0;
        let insurancePayout = (isDrought && insurance) ? 15000 : 0;

        setHarvestData({
            yieldQty: actualQty,
            costs: loanCost + insuranceCost,
            insurancePayout,
            cropLoss: _cropLossValue,
            loanCost,
            insuranceCost
        });

        setStep('result');
    };

    const handleMandiSale = (revenue: number, _pricePerKg: number) => {
        const profit = revenue + harvestData.insurancePayout - harvestData.costs;
        setFinalProfit(profit);
        setStep('final');
        if (profit > 20000) onComplete(100, "Harvest Hero");
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <Sprout size={20} color="#166534" />
                    <Text style={styles.introTitle}>{t('modules.farmer.mission')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('modules.farmer.desc')}</Text>
            </View>

            {step === 'planning' && (
                <View style={styles.stepContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t('modules.farmer.planning.step1')}</Text>
                        <View style={styles.optionsGrid}>
                            <TouchableOpacity
                                onPress={() => setLoanType('moneylender')}
                                style={[styles.optionCard, loanType === 'moneylender' ? styles.optionSelectedOrange : undefined]}
                            >
                                <Text style={styles.optionTitle}>{t('modules.farmer.planning.moneylender.title')}</Text>
                                <Text style={styles.optionDesc}>{t('modules.farmer.planning.moneylender.desc')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setLoanType('bank')}
                                style={[styles.optionCard, loanType === 'bank' ? styles.optionSelectedTeal : undefined]}
                            >
                                <Text style={styles.optionTitle}>{t('modules.farmer.planning.bank.title')}</Text>
                                <Text style={styles.optionDesc}>{t('modules.farmer.planning.bank.desc')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {loanType && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>{t('modules.farmer.planning.step2')}</Text>
                            <View style={styles.optionsGrid}>
                                <TouchableOpacity
                                    onPress={() => setInsurance(true)}
                                    style={[styles.insuranceCard, insurance === true ? styles.insuranceSelectedBlue : undefined]}
                                >
                                    <ShieldCheck color={insurance === true ? "#2563eb" : "#64748b"} size={32} />
                                    <Text style={styles.insuranceTitle}>{t('modules.farmer.planning.insuranceYes')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setInsurance(false)}
                                    style={[styles.insuranceCard, insurance === false ? styles.insuranceSelectedRed : undefined]}
                                >
                                    <X color={insurance === false ? "#ef4444" : "#64748b"} size={32} />
                                    <Text style={styles.insuranceTitle}>{t('modules.farmer.planning.insuranceNo')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {loanType && insurance !== null && (
                        <Button onClick={calculateHarvest}>
                            <Text style={styles.buttonText}>{t('modules.farmer.planning.start')}</Text>
                        </Button>
                    )}
                </View>
            )}

            {step === 'result' && (
                <View style={[styles.stepContainer, styles.centerContent]}>
                    <View style={styles.weatherIconContainer}>
                        {weather === 'drought' ? <CloudRain size={64} color="#94a3b8" /> : <Sun size={64} color="#eab308" />}
                    </View>
                    <Text style={styles.weatherTitle}>
                        {weather === 'drought' ? t('modules.farmer.result.drought') : t('modules.farmer.result.rain')}
                    </Text>

                    <View style={styles.resultDetailsCard}>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultLabel}>{t('modules.farmer.result.yield')}</Text>
                            <Text style={styles.resultValue}>{harvestData.yieldQty} kg</Text>
                        </View>
                        {weather === 'drought' && insurance && (
                            <View style={styles.resultRow}>
                                <Text style={[styles.resultLabel, styles.greenText]}>{t('modules.farmer.result.payout')}</Text>
                                <Text style={[styles.resultValue, styles.greenText]}>+ ₹{harvestData.insurancePayout}</Text>
                            </View>
                        )}
                        {weather === 'drought' && !insurance && (
                            <Text style={styles.dangerNotice}>{t('modules.farmer.result.lowYield')}</Text>
                        )}
                    </View>

                    <Button onClick={() => setStep('mandi')}>
                        <Text style={styles.buttonText}>{t('modules.farmer.result.goMandi')}</Text>
                    </Button>
                </View>
            )}

            {step === 'mandi' && (
                <MarketMandiGame harvestQty={harvestData.yieldQty} onSellComplete={handleMandiSale} />
            )}

            {step === 'final' && (
                <View style={[styles.stepContainer, styles.centerContent]}>
                    <Trophy size={64} color={finalProfit > 20000 ? "#eab308" : "#cbd5e1"} style={styles.trophyIcon} />
                    <Text style={styles.finalTitle}>{t('modules.farmer.summary.title')}</Text>

                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabelGreen}>{t('modules.farmer.summary.revenue')}</Text>
                            <Text style={styles.summaryValueGreen}>+ ₹{(finalProfit + harvestData.costs - harvestData.insurancePayout).toLocaleString()}</Text>
                        </View>
                        {harvestData.insurancePayout > 0 && (
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabelGreen}>{t('modules.farmer.summary.claim')}</Text>
                                <Text style={styles.summaryValueGreen}>+ ₹{harvestData.insurancePayout.toLocaleString()}</Text>
                            </View>
                        )}
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabelRed}>{t('modules.farmer.summary.costs')}</Text>
                            <Text style={styles.summaryValueRed}>- ₹{harvestData.costs.toLocaleString()}</Text>
                        </View>
                        
                        <View style={styles.summaryDivider} />
                        
                        <View style={styles.summaryRow}>
                            <Text style={styles.netProfitLabel}>{t('modules.farmer.summary.netProfit')}</Text>
                            <Text style={[styles.netProfitValue, finalProfit > 0 ? styles.greenText : styles.redText]}>
                                ₹{finalProfit.toLocaleString()}
                            </Text>
                        </View>
                    </View>

                    <Button onClick={() => setStep('planning')} variant="outline">
                        <Text style={styles.outlineButtonText}>{t('modules.farmer.summary.next')}</Text>
                    </Button>
                </View>
            )}
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
        backgroundColor: '#f0fdf4',
        borderLeftWidth: 4,
        borderLeftColor: '#22c55e',
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
        color: '#166534',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#15803d',
    },
    stepContainer: {
        gap: 16,
    },
    centerContent: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 12,
    },
    optionsGrid: {
        flexDirection: 'column',
        gap: 12,
    },
    optionCard: {
        padding: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        backgroundColor: '#ffffff',
    },
    optionSelectedOrange: {
        borderColor: '#f97316',
        backgroundColor: '#fff7ed',
    },
    optionSelectedTeal: {
        borderColor: '#14b8a6',
        backgroundColor: '#f0fdfa',
    },
    optionTitle: {
        fontWeight: 'bold',
        color: '#1e293b',
        fontSize: 16,
        marginBottom: 4,
    },
    optionDesc: {
        fontSize: 12,
        color: '#64748b',
    },
    insuranceCard: {
        padding: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    insuranceSelectedBlue: {
        borderColor: '#3b82f6',
        backgroundColor: '#eff6ff',
    },
    insuranceSelectedRed: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    insuranceTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1e293b',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    outlineButtonText: {
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    weatherIconContainer: {
        marginBottom: 16,
    },
    weatherTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 24,
    },
    resultDetailsCard: {
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        gap: 8,
        marginBottom: 24,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resultLabel: {
        color: '#475569',
        fontSize: 14,
    },
    resultValue: {
        color: '#1e293b',
        fontWeight: 'bold',
        fontSize: 14,
    },
    dangerNotice: {
        color: '#ef4444',
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 8,
    },
    greenText: {
        color: '#16a34a',
    },
    redText: {
        color: '#dc2626',
    },
    trophyIcon: {
        marginBottom: 16,
    },
    finalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 24,
    },
    summaryCard: {
        backgroundColor: '#f1f5f9',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        gap: 8,
        marginBottom: 24,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabelGreen: {
        color: '#15803d',
        fontSize: 14,
    },
    summaryValueGreen: {
        color: '#15803d',
        fontSize: 14,
    },
    summaryLabelRed: {
        color: '#b91c1c',
        fontSize: 14,
    },
    summaryValueRed: {
        color: '#b91c1c',
        fontSize: 14,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: '#cbd5e1',
        marginVertical: 8,
    },
    netProfitLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#1e293b',
    },
    netProfitValue: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});
