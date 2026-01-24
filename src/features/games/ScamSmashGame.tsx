import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, Ban, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
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

    // Game Timer Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState]);

    // Check for Game Over condition
    useEffect(() => {
        if (timeLeft <= 0 && gameState === 'playing') {
            setGameState('end');
        }
    }, [timeLeft, gameState]);

    // Message Spawner
    useEffect(() => {
        if (gameState === 'playing' && !activeMessage) {
            const randomMsg = scenarios[Math.floor(Math.random() * scenarios.length)];
            setActiveMessage(randomMsg);
        }
    }, [gameState, activeMessage]);

    const handleDecision = (action: 'block' | 'accept') => {
        if (!activeMessage) return;

        // Action: 'block' or 'accept'
        const isCorrect =
            (action === 'block' && activeMessage.type === 'scam') ||
            (action === 'accept' && activeMessage.type === 'safe');

        if (isCorrect) setScore(s => s + 10);
        else setScore(s => Math.max(0, s - 5));

        setActiveMessage(null); // Clear to spawn next
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameState('playing');
        setActiveMessage(null);
    };

    return (
        <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                    <ShieldCheck size={20} /> {t('games.scamSmash.title')}
                </h3>
                <p className="text-sm text-red-700">{t('games.scamSmash.desc')}</p>
            </div>

            {gameState === 'start' && (
                <div className="text-center py-8">
                    <ShieldCheck size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-lg text-slate-600 mb-6">{t('games.scamSmash.intro')}</p>
                    <Button onClick={startGame}>{t('games.scamSmash.start')}</Button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="relative bg-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col items-center justify-between">
                    <div className="w-full flex justify-between text-white font-mono">
                        <span>{t('games.scamSmash.score')}: {score}</span>
                        <span className={timeLeft < 10 ? "text-red-400" : ""}>{timeLeft}s</span>
                    </div>

                    {activeMessage ? (
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm animate-slideUp text-center">
                            <div className="mb-4">
                                <Smartphone className="mx-auto text-slate-400 mb-2" />
                                <p className="font-bold text-slate-800 text-lg">{activeMessage.text}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleDecision('block')}
                                    className="bg-red-100 text-red-700 p-3 rounded-lg font-bold hover:bg-red-200 flex flex-col items-center gap-1"
                                >
                                    <Ban size={20} /> {t('games.scamSmash.actions.block')}
                                </button>
                                <button
                                    onClick={() => handleDecision('accept')}
                                    className="bg-green-100 text-green-700 p-3 rounded-lg font-bold hover:bg-green-200 flex flex-col items-center gap-1"
                                >
                                    <Unlock size={20} /> {t('games.scamSmash.actions.accept')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white animate-pulse">{t('games.scamSmash.scanning')}</div>
                    )}
                    <div className="text-xs text-slate-400 mt-2">{t('games.scamSmash.tapFast')}</div>
                </div>
            )}

            {gameState === 'end' && (
                <div className="text-center py-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('games.scamSmash.timesUp')}</h2>
                    <div className="text-4xl font-bold text-orange-600 mb-4">{t('games.scamSmash.score')}: {score}</div>
                    {score > 30 ? (
                        <div className="text-green-600 font-bold mb-6">{t('games.scamSmash.won')}</div>
                    ) : (
                        <div className="text-red-500 font-bold mb-6">{t('games.scamSmash.lost')}</div>
                    )}
                    <Button onClick={() => onComplete(score > 30 ? 100 : 20, "Cyber Guardian")}>
                        {t('games.scamSmash.finish')}
                    </Button>
                </div>
            )}
        </div>
    );
};
