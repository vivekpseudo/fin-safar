import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ShieldCheck, Smartphone, Ban, Unlock } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface Scenario {
    id: number;
    text: string;
    type: 'scam' | 'safe';
}

interface ScamSmashGameProps {
    onComplete: (score: number, badge: string) => void;
}

export const ScamSmashGame: React.FC<ScamSmashGameProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [activeMessage, setActiveMessage] = useState<Scenario | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');

    const scenarios: Scenario[] = [
        { id: 1, text: t('games.scamSmash.scenarios.s1'), type: "scam" },
        { id: 2, text: t('games.scamSmash.scenarios.s2'), type: "safe" },
        { id: 3, text: t('games.scamSmash.scenarios.s3'), type: "scam" },
        { id: 4, text: t('games.scamSmash.scenarios.s4'), type: "safe" },
        { id: 5, text: t('games.scamSmash.scenarios.s5'), type: "scam" },
        { id: 6, text: t('games.scamSmash.scenarios.s6'), type: "safe" }
    ];

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    useEffect(() => {
        if (timeLeft <= 0 && gameState === 'playing') {
            setGameState('end');
        }
    }, [timeLeft, gameState]);

    useEffect(() => {
        if (gameState === 'playing' && !activeMessage) {
            const randomMsg = scenarios[Math.floor(Math.random() * scenarios.length)];
            setActiveMessage(randomMsg);
        }
    }, [gameState, activeMessage]);

    const handleDecision = (action: 'block' | 'accept') => {
        if (!activeMessage) return;

        const isCorrect =
            (action === 'block' && activeMessage.type === 'scam') ||
            (action === 'accept' && activeMessage.type === 'safe');

        if (isCorrect) setScore(s => s + 10);
        else setScore(s => Math.max(0, s - 5));

        setActiveMessage(null);
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
        setActiveMessage(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <ShieldCheck size={20} color="#991b1b" />
                    <Text style={styles.introTitle}>{t('games.scamSmash.title')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('games.scamSmash.desc')}</Text>
            </View>

            {gameState === 'start' && (
                <View style={styles.startContainer}>
                    <ShieldCheck size={64} color="#cbd5e1" style={styles.startIcon} />
                    <Text style={styles.startDesc}>{t('games.scamSmash.intro')}</Text>
                    <Button onClick={startGame}>
                        <Text style={styles.buttonText}>{t('games.scamSmash.start')}</Text>
                    </Button>
                </View>
            )}

            {gameState === 'playing' && (
                <View style={styles.gameContainer}>
                    <View style={styles.statsHeader}>
                        <Text style={styles.statsText}>{t('games.scamSmash.score')}: {score}</Text>
                        <Text style={[styles.statsText, timeLeft < 10 && styles.dangerText]}>{timeLeft}s</Text>
                    </View>

                    {activeMessage ? (
                        <View style={styles.messageCard}>
                            <Smartphone size={32} color="#94a3b8" style={styles.messageIcon} />
                            <Text style={styles.messageText}>{activeMessage.text}</Text>

                            <View style={styles.actionsContainer}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.blockButton]}
                                    onPress={() => handleDecision('block')}
                                >
                                    <Ban size={20} color="#b91c1c" />
                                    <Text style={styles.blockText}>{t('games.scamSmash.actions.block')}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.acceptButton]}
                                    onPress={() => handleDecision('accept')}
                                >
                                    <Unlock size={20} color="#15803d" />
                                    <Text style={styles.acceptText}>{t('games.scamSmash.actions.accept')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <Text style={styles.scanningText}>{t('games.scamSmash.scanning')}</Text>
                    )}

                    <Text style={styles.hintText}>{t('games.scamSmash.tapFast')}</Text>
                </View>
            )}

            {gameState === 'end' && (
                <View style={styles.endContainer}>
                    <Text style={styles.timesUpText}>{t('games.scamSmash.timesUp')}</Text>
                    <Text style={styles.finalScoreText}>{t('games.scamSmash.score')}: {score}</Text>

                    {score > 30 ? (
                        <Text style={styles.wonText}>{t('games.scamSmash.won')}</Text>
                    ) : (
                        <Text style={styles.lostText}>{t('games.scamSmash.lost')}</Text>
                    )}

                    <Button onClick={() => onComplete(score > 30 ? 100 : 20, "Cyber Guardian")}>
                        <Text style={styles.buttonText}>{t('games.scamSmash.finish')}</Text>
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 16,
        padding: 16,
    },
    introCard: {
        backgroundColor: '#fef2f2',
        borderLeftWidth: 4,
        borderLeftColor: '#ef4444',
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
        color: '#991b1b',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#b91c1c',
    },
    startContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    startIcon: {
        marginBottom: 16,
    },
    startDesc: {
        fontSize: 18,
        color: '#475569',
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    gameContainer: {
        backgroundColor: '#1e293b',
        borderRadius: 16,
        padding: 16,
        minHeight: 300,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statsHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statsText: {
        color: '#ffffff',
        fontFamily: 'Courier',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dangerText: {
        color: '#f87171',
    },
    messageCard: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 12,
        width: '100%',
        maxWidth: 320,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 16,
    },
    messageIcon: {
        marginBottom: 12,
    },
    messageText: {
        fontWeight: 'bold',
        color: '#1e293b',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 24,
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 16,
        width: '100%',
    },
    actionButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 4,
    },
    blockButton: {
        backgroundColor: '#fee2e2',
    },
    blockText: {
        color: '#b91c1c',
        fontWeight: 'bold',
    },
    acceptButton: {
        backgroundColor: '#dcfce7',
    },
    acceptText: {
        color: '#15803d',
        fontWeight: 'bold',
    },
    scanningText: {
        color: '#ffffff',
        fontSize: 16,
        fontStyle: 'italic',
    },
    hintText: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 16,
    },
    endContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    timesUpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
    },
    finalScoreText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#ea580c',
        marginBottom: 16,
    },
    wonText: {
        color: '#16a34a',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 24,
    },
    lostText: {
        color: '#ef4444',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 24,
    }
});
