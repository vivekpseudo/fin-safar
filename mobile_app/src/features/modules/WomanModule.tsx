import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Home as HomeIcon, CheckCircle, X, BookOpen } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface WomanModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const WomanModule: React.FC<WomanModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [tab, setTab] = useState<'budget' | 'fraud'>('budget');
    const [completed, setCompleted] = useState(false);

    // Budget Game State
    const [funds, setFunds] = useState({ household: 0, business: 0 });
    const [currentMoney, setCurrentMoney] = useState(5000);

    const handleAllocate = (type: 'household' | 'business') => {
        if (currentMoney <= 0) return;
        setFunds(prev => ({ ...prev, [type]: prev[type] + 1000 }));
        setCurrentMoney(prev => prev - 1000);
    };

    const checkBudget = () => {
        const balanced = funds.business >= 2000 && funds.household >= 2000;
        if (balanced) {
            setTab('fraud');
        } else {
            // Need a reset or alert logic. Will reset for simplicity
            setFunds({ household: 0, business: 0 });
            setCurrentMoney(5000);
        }
    };

    // Fraud Quiz State
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleQuiz = (safe: boolean) => {
        setQuizAnswered(true);
        setIsCorrect(safe);
        if (safe) {
            onComplete(100, "Safety Star");
            setCompleted(true);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <HomeIcon size={20} color="#6b21a8" />
                    <Text style={styles.introTitle}>{t('modules.woman.mission')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('modules.woman.desc')}</Text>
            </View>

            {tab === 'budget' && (
                <View style={styles.budgetContainer}>
                    <View style={styles.budgetStatus}>
                        <Text style={styles.budgetLabel}>{t('modules.woman.budget.toSort')}</Text>
                        <Text style={styles.budgetAmount}>₹{currentMoney}</Text>
                    </View>

                    <View style={styles.jarsContainer}>
                        <View style={styles.jarCardLeft}>
                            <Text style={styles.jarTitleLeft}>{t('modules.woman.budget.household')}</Text>
                            <Text style={styles.jarAmountLeft}>₹{funds.household}</Text>
                            <Button 
                                onClick={() => handleAllocate('household')} 
                                disabled={currentMoney <= 0}
                                style={styles.allocateBtnLeft}
                            >
                                <Text style={styles.buttonText}>{t('modules.woman.budget.add')}</Text>
                            </Button>
                        </View>
                        <View style={styles.jarCardRight}>
                            <Text style={styles.jarTitleRight}>{t('modules.woman.budget.business')}</Text>
                            <Text style={styles.jarAmountRight}>₹{funds.business}</Text>
                            <Button 
                                onClick={() => handleAllocate('business')} 
                                disabled={currentMoney <= 0}
                                style={styles.allocateBtnRight}
                            >
                                <Text style={styles.buttonText}>{t('modules.woman.budget.add')}</Text>
                            </Button>
                        </View>
                    </View>

                    {currentMoney === 0 && (
                        <View style={styles.checkButtonContainer}>
                            <Button onClick={checkBudget}>
                                <Text style={styles.buttonText}>{t('modules.woman.budget.check')}</Text>
                            </Button>
                            {funds.business < 2000 || funds.household < 2000 ? (
                                <Text style={styles.warningText}>{t('modules.woman.budget.alert')}</Text>
                            ) : null}
                        </View>
                    )}
                </View>
            )}

            {tab === 'fraud' && (
                <View style={styles.fraudContainer}>
                    <Text style={styles.fraudTitle}>{t('modules.woman.fraud.title')}</Text>
                    
                    <View style={styles.quizCard}>
                        <Text style={styles.quizQuestion}>{t('modules.woman.fraud.question')}</Text>

                        {!quizAnswered ? (
                            <View style={styles.quizActions}>
                                <Button style={styles.dangerButton} onClick={() => handleQuiz(false)}>
                                    <Text style={styles.buttonText}>{t('modules.woman.fraud.btnTell')}</Text>
                                </Button>
                                <Button style={styles.successButton} onClick={() => handleQuiz(true)}>
                                    <Text style={styles.buttonText}>{t('modules.woman.fraud.btnDisconnect')}</Text>
                                </Button>
                            </View>
                        ) : (
                            <View style={[styles.resultBox, isCorrect ? styles.resultBoxCorrect : styles.resultBoxIncorrect]}>
                                {isCorrect ? (
                                    <View style={styles.resultRow}>
                                        <CheckCircle size={20} color="#15803d" />
                                        <Text style={styles.resultTextCorrect}>{t('modules.woman.fraud.correct')}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.resultRow}>
                                        <X size={20} color="#b91c1c" />
                                        <Text style={styles.resultTextIncorrect}>{t('modules.woman.fraud.incorrect')}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>

                    {completed && (
                        <View style={styles.lessonCard}>
                            <BookOpen size={20} color="#854d0e" style={styles.lessonIcon} />
                            <Text style={styles.lessonText}>
                                <Text style={styles.lessonBold}>Lesson: </Text>
                                {t('modules.woman.fraud.lesson')}
                            </Text>
                        </View>
                    )}
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
        backgroundColor: '#faf5ff',
        borderLeftWidth: 4,
        borderLeftColor: '#a855f7',
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
        color: '#6b21a8',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#7e22ce',
    },
    budgetContainer: {
        gap: 24,
    },
    budgetStatus: {
        alignItems: 'center',
    },
    budgetLabel: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 4,
    },
    budgetAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    jarsContainer: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
    },
    jarCardLeft: {
        flex: 1,
        backgroundColor: '#eff6ff',
        borderWidth: 2,
        borderColor: '#dbeafe',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    jarTitleLeft: {
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
    },
    jarAmountLeft: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2563eb',
        marginBottom: 16,
    },
    allocateBtnLeft: {
        backgroundColor: '#2563eb', // blue-600
        width: '100%',
        paddingVertical: 12,
    },
    jarCardRight: {
        flex: 1,
        backgroundColor: '#fff7ed',
        borderWidth: 2,
        borderColor: '#ffedd5',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    jarTitleRight: {
        fontWeight: 'bold',
        color: '#9a3412',
        marginBottom: 8,
    },
    jarAmountRight: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ea580c',
        marginBottom: 16,
    },
    allocateBtnRight: {
        backgroundColor: '#ea580c', // orange-600
        width: '100%',
        paddingVertical: 12,
    },
    checkButtonContainer: {
        alignItems: 'center',
        marginTop: 16,
    },
    warningText: {
        color: '#ef4444',
        marginTop: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    fraudContainer: {
        gap: 16,
        marginTop: 16,
    },
    fraudTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    quizCard: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    quizQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 16,
        lineHeight: 24,
    },
    quizActions: {
        gap: 12,
    },
    dangerButton: {
        backgroundColor: '#ef4444',
    },
    successButton: {
        backgroundColor: '#22c55e',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    resultBox: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    resultBoxCorrect: {
        backgroundColor: '#dcfce7',
    },
    resultBoxIncorrect: {
        backgroundColor: '#fee2e2',
    },
    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    resultTextCorrect: {
        color: '#15803d',
        fontWeight: 'bold',
        fontSize: 16,
    },
    resultTextIncorrect: {
        color: '#b91c1c',
        fontWeight: 'bold',
        fontSize: 16,
    },
    lessonCard: {
        backgroundColor: '#fefce8',
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        marginTop: 16,
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
