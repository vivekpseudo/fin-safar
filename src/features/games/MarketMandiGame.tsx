import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MarketMandiGameProps {
    harvestQty: number;
    onSellComplete: (revenue: number, pricePerKg: number) => void;
}

export const MarketMandiGame: React.FC<MarketMandiGameProps> = ({ harvestQty, onSellComplete }) => {
    const [day, setDay] = useState(1);
    const [price, setPrice] = useState(20); // Starting price per kg
    const [history, setHistory] = useState<number[]>([20]);
    const [sold, setSold] = useState(false);

    const handleSell = (finalPrice: number) => {
        setSold(true);
        onSellComplete(finalPrice * harvestQty, finalPrice);
    };

    // Simulation: Prices fluctuate
    useEffect(() => {
        if (sold) return;

        // Check auto-sell condition outside of state updater
        if (day >= 10) {
            handleSell(price);
            return;
        }

        const timer = setInterval(() => {
            setDay(prev => prev + 1);

            setPrice(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
                const newPrice = Math.max(15, prev + change);
                setHistory(h => [...h, newPrice]);
                return newPrice;
            });
        }, 1500); // 1.5 second per day

        return () => clearInterval(timer);
    }, [sold, day]); // Dependencies ensure we re-evaluate when day changes

    return (
        <div className="space-y-4 animate-fadeIn">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                    <ShoppingBag size={20} /> Level 2: Mandi Master
                </h4>
                <p className="text-sm text-yellow-700">Prices change daily. Sell when the price is high! Auto-sell on Day 10.</p>
            </div>

            <div className="text-center py-6">
                <div className="text-sm text-slate-500 uppercase tracking-wide">Current Mandi Price (Day {day}/10)</div>
                <div className="text-4xl font-bold text-slate-800 my-2">₹{price}/kg</div>
                <div className="h-16 flex items-end justify-center gap-1">
                    {history.map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${(h / 30) * 100}%` }}
                            className={`w-4 rounded-t ${i === history.length - 1 ? 'bg-orange-500' : 'bg-orange-200'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {!sold ? (
                <Button onClick={() => handleSell(price)} variant="success">
                    Sell {harvestQty}kg Now (Total: ₹{(price * harvestQty).toLocaleString()})
                </Button>
            ) : (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg font-bold">
                    Sold at ₹{price}/kg!
                </div>
            )}
        </div>
    );
};
