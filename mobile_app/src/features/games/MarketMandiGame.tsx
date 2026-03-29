import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface MarketMandiGameProps {
    harvestQty: number;
    onSellComplete: (revenue: number, pricePerKg: number) => void;
}

export const MarketMandiGame: React.FC<MarketMandiGameProps> = ({ harvestQty, onSellComplete }) => {
    const { t } = useTranslation();
    const [day, setDay] = useState(1);
    const [price, setPrice] = useState(20);
    const [history, setHistory] = useState<number[]>([20]);
    const [sold, setSold] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const handleSell = (finalPrice: number) => {
        if (timerRef.current) {
            setSold(true);
            clearInterval(timerRef.current);
            onSellComplete(finalPrice * harvestQty, finalPrice);
        }
    };

    useEffect(() => {
        if (sold) return;

        if (day >= 10) {
            handleSell(price);
            return;
        }

        timerRef.current = setInterval(() => {
            setDay(prev => prev + 1);

            setPrice(prev => {
                const change = Math.floor(Math.random() * 5) - 2;
                const newPrice = Math.max(15, prev + change);
                setHistory(h => [...h, newPrice]);
                return newPrice;
            });
        }, 1500);

        return () => {
            if (timerRef?.current)
                clearInterval(timerRef.current);
        }
    }, [sold, day]);

    return (
        <View style={styles.container}>
            <View style={styles.introCard}>
                <View style={styles.introHeader}>
                    <ShoppingBag size={20} color="#854d0e" />
                    <Text style={styles.introTitle}>{t('games.mandi.title')}</Text>
                </View>
                <Text style={styles.introDesc}>{t('games.mandi.desc')}</Text>
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.dayText}>{t('games.mandi.currentPrice', { day })}</Text>
                <Text style={styles.priceText}>₹{price}/kg</Text>

                <View style={styles.barsContainer}>
                    {history.map((h, i) => (
                        <View
                            key={i}
                            style={[
                                styles.bar,
                                { height: (h / 30) * 100 },
                                i === history.length - 1 ? styles.latestBar : styles.pastBar
                            ]}
                        />
                    ))}
                </View>
            </View>

            {!sold ? (
                <Button onClick={() => handleSell(price)} variant="primary">
                    <Text style={styles.buttonText}>
                        {t('games.mandi.sellNow', { qty: harvestQty, total: (price * harvestQty).toLocaleString() })}
                    </Text>
                </Button>
            ) : (
                <View style={styles.soldCard}>
                    <Text style={styles.soldText}>{t('games.mandi.soldAt', { price })}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 16,
    },
    introCard: {
        backgroundColor: '#fefce8',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#fef08a',
        marginBottom: 24,
    },
    introHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    introTitle: {
        fontWeight: 'bold',
        color: '#854d0e',
        marginLeft: 8,
        fontSize: 16,
    },
    introDesc: {
        fontSize: 14,
        color: '#a16207',
    },
    chartContainer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    dayText: {
        fontSize: 12,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    priceText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#1e293b',
        marginVertical: 8,
    },
    barsContainer: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 4,
        marginTop: 16,
    },
    bar: {
        width: 16,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    latestBar: {
        backgroundColor: '#f97316',
    },
    pastBar: {
        backgroundColor: '#fed7aa',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    soldCard: {
        backgroundColor: '#dcfce7',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    soldText: {
        color: '#166534',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
