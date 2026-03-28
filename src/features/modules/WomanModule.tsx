import React, { useState } from 'react';
import { Home, CheckCircle, X, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

interface WomanModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const WomanModule: React.FC<WomanModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
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
            alert(t('modules.woman.budget.alert'));
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
                    <Home size={20} /> {t('modules.woman.mission')}
                </h3>
                <p className="text-sm text-purple-700">{t('modules.woman.desc')}</p>
            </div>

            {tab === 'budget' && (
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-slate-500 mb-1">{t('modules.woman.budget.toSort')}</p>
                        <div className="text-3xl font-bold text-slate-800">₹{currentMoney}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 text-center">
                            <h4 className="font-bold text-blue-800 mb-2">{t('modules.woman.budget.household')}</h4>
                            <div className="text-xl font-bold text-blue-600 mb-3">₹{funds.household}</div>
                            <Button onClick={() => handleAllocate('household')} disabled={currentMoney <= 0} variant="secondary" className="bg-blue-600 hover:bg-blue-700">
                                {t('modules.woman.budget.add')}
                            </Button>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-100 text-center">
                            <h4 className="font-bold text-orange-800 mb-2">{t('modules.woman.budget.business')}</h4>
                            <div className="text-xl font-bold text-orange-600 mb-3">₹{funds.business}</div>
                            <Button onClick={() => handleAllocate('business')} disabled={currentMoney <= 0} variant="primary">
                                {t('modules.woman.budget.add')}
                            </Button>
                        </div>
                    </div>

                    {currentMoney === 0 && (
                        <Button onClick={checkBudget}>{t('modules.woman.budget.check')}</Button>
                    )}
                </div>
            )}

            {tab === 'fraud' && (
                <div className="space-y-4 animate-fadeIn">
                    <h4 className="font-bold text-lg text-slate-800">{t('modules.woman.fraud.title')}</h4>
                    <div className="bg-white border p-4 rounded-lg shadow-sm">
                        <p className="mb-4 font-medium">{t('modules.woman.fraud.question')}</p>

                        {!quizAnswered ? (
                            <div className="space-y-3">
                                <Button variant="danger" onClick={() => handleQuiz(false)}>
                                    {t('modules.woman.fraud.btnTell')}
                                </Button>
                                <Button variant="success" onClick={() => handleQuiz(true)}>
                                    {t('modules.woman.fraud.btnDisconnect')}
                                </Button>
                            </div>
                        ) : (
                            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {isCorrect ? (
                                    <div className="flex items-center gap-2"><CheckCircle size={20} /> {t('modules.woman.fraud.correct')}</div>
                                ) : (
                                    <div className="flex items-center gap-2"><X size={20} /> {t('modules.woman.fraud.incorrect')}</div>
                                )}
                            </div>
                        )}
                    </div>
                    {completed && (
                        <div className="p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 flex items-start gap-2">
                            <BookOpen size={16} className="mt-1 flex-shrink-0" />
                            <p><strong>Lesson:</strong> {t('modules.woman.fraud.lesson')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
