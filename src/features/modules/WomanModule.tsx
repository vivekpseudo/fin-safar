import React, { useState } from 'react';
import { Home, CheckCircle, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface WomanModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const WomanModule: React.FC<WomanModuleProps> = ({ onComplete }) => {
    const [tab, setTab] = useState<'budget' | 'fraud'>('budget');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_budgetScore, setBudgetScore] = useState(0);
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
        // Ideal: 3000 Business, 2000 Household (example logic)
        const balanced = funds.business >= 2000 && funds.household >= 2000;
        if (balanced) {
            setBudgetScore(50);
            setTab('fraud');
        } else {
            alert("Try to balance! Don't spend all capital on household, and don't starve the house for business.");
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
        <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                <h3 className="font-bold text-purple-800 flex items-center gap-2">
                    <Home size={20} /> Mission: Ghar Aur Vyapaar
                </h3>
                <p className="text-sm text-purple-700">Separate your business money from home expenses & stay safe online.</p>
            </div>

            {tab === 'budget' && (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-slate-500 mb-1">Money to Sort</p>
                        <div className="text-3xl font-bold text-slate-800">₹{currentMoney}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 text-center">
                            <h4 className="font-bold text-blue-800 mb-2">Household</h4>
                            <div className="text-xl font-bold text-blue-600 mb-3">₹{funds.household}</div>
                            <Button onClick={() => handleAllocate('household')} disabled={currentMoney <= 0} variant="secondary" className="bg-blue-600 hover:bg-blue-700">
                                Add ₹1000
                            </Button>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100 text-center">
                            <h4 className="font-bold text-orange-800 mb-2">Business</h4>
                            <div className="text-xl font-bold text-orange-600 mb-3">₹{funds.business}</div>
                            <Button onClick={() => handleAllocate('business')} disabled={currentMoney <= 0} variant="primary">
                                Add ₹1000
                            </Button>
                        </div>
                    </div>

                    {currentMoney === 0 && (
                        <Button onClick={checkBudget}>Check Allocation</Button>
                    )}
                </div>
            )}

            {tab === 'fraud' && (
                <div className="space-y-4 animate-fadeIn">
                    <h4 className="font-bold text-lg text-slate-800">Quiz: Digital Safety</h4>
                    <div className="bg-white border p-4 rounded-lg shadow-sm">
                        <p className="mb-4 font-medium">You receive a call: "Madam, I am from the Bank. Your KYC is expired. Please tell me the OTP sent to your phone to reactivate it."</p>

                        {!quizAnswered ? (
                            <div className="space-y-3">
                                <Button variant="danger" onClick={() => handleQuiz(false)}>
                                    Tell the OTP
                                </Button>
                                <Button variant="success" onClick={() => handleQuiz(true)}>
                                    Disconnect & Visit Bank
                                </Button>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {isCorrect ? (
                                    <div className="flex items-center gap-2"><CheckCircle size={20} /> Correct! Banks never ask for OTPs over the phone.</div>
                                ) : (
                                    <div className="flex items-center gap-2"><X size={20} /> Incorrect. Never share OTPs. You could lose all your money.</div>
                                )}
                            </div>
                        )}
                    </div>
                    {completed && (
                        <div className="p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 flex items-start gap-2">
                            <BookOpen size={16} className="mt-1 flex-shrink-0" />
                            <p><strong>Lesson:</strong> Keeping business capital separate ensures your shop keeps running. Staying alert prevents fraud.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
