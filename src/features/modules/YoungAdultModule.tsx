import React, { useState, useEffect } from 'react';
import { TrendingUp, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface YoungAdultModuleProps {
    onComplete: (score: number, badge: string) => void;
}

export const YoungAdultModule: React.FC<YoungAdultModuleProps> = ({ onComplete }) => {
    const { t } = useTranslation();
    const [age, setAge] = useState(25);
    const [monthlyInvest, setMonthlyInvest] = useState(1000);

    // Simple compound interest: A = P * ((1+r)^n - 1) / r * (1+r)
    // Assuming 12% annual return (0.01 monthly)
    const calculateCorpus = (startAge: number, investment: number) => {
        const r = 0.01; // 1% monthly
        const years = 60 - startAge;
        const n = years * 12;
        if (n <= 0) return 0;
        const corpus = investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        return Math.round(corpus);
    };

    // const corpus25 = calculateCorpus(25, 1000); // Baseline comparison - Removed unused
    const currentCorpus = calculateCorpus(age, monthlyInvest);

    useEffect(() => {
        if (currentCorpus > 2000000 && age < 30) {
            onComplete(100, "Wealth Wizard"); // Passive award
        }
    }, [age, monthlyInvest, currentCorpus, onComplete]);

    return (
        <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                    <TrendingUp size={20} /> {t('modules.young_adult.mission')}
                </h3>
                <p className="text-sm text-indigo-700">{t('modules.young_adult.desc')}</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('modules.young_adult.startAge', { age })}</label>
                    <input
                        type="range"
                        min="20"
                        max="50"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>20</span>
                        <span>35</span>
                        <span>50</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('modules.young_adult.monthly', { amt: monthlyInvest })}</label>
                    <div className="flex gap-2">
                        {[500, 1000, 5000, 10000].map(amt => (
                            <button
                                key={amt}
                                onClick={() => setMonthlyInvest(amt)}
                                className={`px-3 py-1 rounded-full text-sm font-bold ${monthlyInvest === amt ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                            >
                                ₹{amt}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-inner text-center">
                    <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">{t('modules.young_adult.corpus')}</p>
                    <div className="text-3xl md:text-4xl font-bold text-green-400">
                        ₹{(currentCorpus / 100000).toFixed(2)} {t('modules.young_adult.lakhs')}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">{t('modules.young_adult.disclaimer')}</div>
                </div>

                {/* Visual comparison could go here if needed */}

                <div className="p-4 bg-yellow-50 rounded-lg text-sm text-yellow-800 flex items-start gap-2">
                    <BookOpen size={16} className="mt-1 flex-shrink-0" />
                    <p><strong>Lesson:</strong> {t('modules.young_adult.lesson')}</p>
                </div>
            </div>
        </div>
    );
};
