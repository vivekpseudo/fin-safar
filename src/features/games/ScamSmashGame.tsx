import React, { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, Ban, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Scenario {
    id: number;
    text: string;
    type: 'scam' | 'safe';
}

interface ScamSmashGameProps {
    onComplete: (score: number, badge: string) => void;
}

export const ScamSmashGame: React.FC<ScamSmashGameProps> = ({ onComplete }) => {
    const [activeMessage, setActiveMessage] = useState<Scenario | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');

    const scenarios: Scenario[] = [
        { id: 1, text: "BANK ALERT: Your KYC is expired. Click link to update.", type: "scam" },
        { id: 2, text: "UPI: Payment of ₹500 received from Rahul.", type: "safe" },
        { id: 3, text: "LOTTERY: You won ₹1 Crore! Pay ₹5000 tax to claim.", type: "scam" },
        { id: 4, text: "OTP: Your Login OTP is 4532. Do not share.", type: "safe" },
        { id: 5, text: "JOB OFFER: Work from home, earn ₹50k/day. No skills needed.", type: "scam" },
        { id: 6, text: "Electric Bill: Due date tomorrow. Pay via official app.", type: "safe" }
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
                    <ShieldCheck size={20} /> Level 2: Scam Smash
                </h3>
                <p className="text-sm text-red-700">Block Scams. Accept Safe Alerts. Be fast!</p>
            </div>

            {gameState === 'start' && (
                <div className="text-center py-8">
                    <ShieldCheck size={64} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-lg text-slate-600 mb-6">You have 30 seconds to clean your inbox.</p>
                    <Button onClick={startGame}>Start Protection</Button>
                </div>
            )}

            {gameState === 'playing' && (
                <div className="relative bg-slate-800 rounded-xl p-4 min-h-[300px] flex flex-col items-center justify-between">
                    <div className="w-full flex justify-between text-white font-mono">
                        <span>Score: {score}</span>
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
                                    <Ban size={20} /> Block
                                </button>
                                <button
                                    onClick={() => handleDecision('accept')}
                                    className="bg-green-100 text-green-700 p-3 rounded-lg font-bold hover:bg-green-200 flex flex-col items-center gap-1"
                                >
                                    <Unlock size={20} /> Accept
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white animate-pulse">Scanning...</div>
                    )}
                    <div className="text-xs text-slate-400 mt-2">Tap quickly!</div>
                </div>
            )}

            {gameState === 'end' && (
                <div className="text-center py-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Time's Up!</h2>
                    <div className="text-4xl font-bold text-orange-600 mb-4">Score: {score}</div>
                    {score > 30 ? (
                        <div className="text-green-600 font-bold mb-6">Excellent! You are a Cyber-Safe Citizen.</div>
                    ) : (
                        <div className="text-red-500 font-bold mb-6">Too many scams slipped through! Try again.</div>
                    )}
                    <Button onClick={() => onComplete(score > 30 ? 100 : 20, "Cyber Guardian")}>
                        Finish Level
                    </Button>
                </div>
            )}
        </div>
    );
};
