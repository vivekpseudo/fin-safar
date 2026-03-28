import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { ScamSmashGame } from '@/features/games/ScamSmashGame';
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
        if (item.type === choice) {
            setScore(s => s + 10);
        } else {
            setScore(s => Math.max(0, s - 5));
        }

        if (currentItemIndex < items.length - 1) {
            setCurrentItemIndex(i => i + 1);
        } else {
            if (score >= 30) {
                onComplete(50, "Savings Scout");
                setLevel(2); // Unlock Scam Smash
            }
        }
    };

    if (level === 2) {
        return <ScamSmashGame onComplete={onComplete} />;
    }

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                    <BookOpen size={20} /> {t('modules.student.level1')}
                </h3>
                <p className="text-sm text-blue-700">{t('modules.student.desc')}</p>
            </div>

            <div className="text-center space-y-8 py-8">
                <div className="inline-block bg-slate-100 px-6 py-2 rounded-full font-bold text-slate-600 mb-4">
                    {t('modules.student.score')}: {score}
                </div>

                <div className="h-32 flex items-center justify-center">
                    <div className="text-3xl font-bold text-slate-800 p-6 bg-white shadow-xl rounded-xl border-2 border-slate-100 w-64 animate-slideUp">
                        {items[currentItemIndex].name}
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => handleChoice('need')}
                        className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        {t('modules.student.need')}
                    </button>
                    <button
                        onClick={() => handleChoice('want')}
                        className="px-8 py-4 bg-pink-600 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        {t('modules.student.want')}
                    </button>
                </div>
            </div>
        </div>
    );
};
