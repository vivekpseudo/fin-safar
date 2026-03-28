import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BookOpen } from 'lucide-react-native';
import { ScamSmashGame } from '../games/ScamSmashGame';
import { useTranslation } from 'react-i18next';

interface StudentModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const StudentModule: React.FC<StudentModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [level, setLevel] = useState(1);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [score, setScore] = useState(0);

    const items = [
        { id: 1, name: t('modules.student.items.busPass'), type: "need" },
        { id: 2, name: t('modules.student.items.videoGame'), type: "want" },
        { id: 3, name: t('modules.student.items.textbooks'), type: "need" },
        { id: 4, name: t('modules.student.items.shoes'), type: "want" },
        { id: 5, name: t('modules.student.items.lunch'), type: "need" }
    ];

   const handleChoice = (choice: 'need' | 'want') => {
    const item = items[currentItemIndex];

    let newScore = score;

    if (item.type === choice) {
        newScore = score + 10;
    } else {
        newScore = Math.max(0, score - 5);
    }

    setScore(newScore);

    if (currentItemIndex < items.length - 1) {
        setCurrentItemIndex(i => i + 1);
    } else {
        
        if (newScore >= 30) {
            setLevel(2); 
        } else {
            onComplete(newScore, "Savings Scout"); 
        }
    }
};

    if (level === 2) {
        return <ScamSmashGame onComplete={onComplete} />;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <BookOpen size={20} color="#1e40af" />
                    <Text style={styles.introTitle}>{t('modules.student.level1')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('modules.student.desc')}</Text>
            </View>

            <View style={styles.gameContainer}>
                <View style={styles.scoreBadgeContainer}>
                    <Text style={styles.scoreBadgeText}>{t('modules.student.score')}: {score}</Text>
                </View>

                <View style={styles.itemDisplayContainer}>
                    <View style={styles.itemCard}>
                        <Text style={styles.itemNameText}>{items[currentItemIndex].name}</Text>
                    </View>
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.needButton]} 
                        onPress={() => handleChoice('need')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.actionButtonText}>{t('modules.student.need')}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.wantButton]} 
                        onPress={() => handleChoice('want')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.actionButtonText}>{t('modules.student.want')}</Text>
                    </TouchableOpacity>
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
        backgroundColor: '#eff6ff',
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
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
        color: '#1e40af',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#1d4ed8',
    },
    gameContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    scoreBadgeContainer: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 32,
    },
    scoreBadgeText: {
        fontWeight: 'bold',
        color: '#475569',
        fontSize: 16,
    },
    itemDisplayContainer: {
        height: 160,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        width: '100%',
    },
    itemCard: {
        backgroundColor: '#ffffff',
        padding: 24,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: 256,
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
    },
    itemNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'center',
        width: '100%',
    },
    actionButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    needButton: {
        backgroundColor: '#0d9488', // teal-600
    },
    wantButton: {
        backgroundColor: '#db2777', // pink-600
    },
    actionButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 18,
    }
});
