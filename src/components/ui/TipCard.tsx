import React, { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TipCardProps {
    onClose: () => void;
}

export const TipCard: React.FC<TipCardProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [tipIndex, setTipIndex] = useState(1);

    useEffect(() => {
        // Random tip from 1 to 10
        setTipIndex(Math.floor(Math.random() * 10) + 1);
    }, []);

    const tip = t(`tips.t${tipIndex}`);

    return (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm mb-6 flex justify-between items-start animate-slideUp">
            <div className="flex gap-3">
                <div>
                    <div className="bg-orange-100 p-2 rounded-full mt-1">
                        <Lightbulb size={20} className="text-orange-600" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-orange-800 text-xs uppercase tracking-wide">{t('settings.dailyTips')}</h4>
                    <p className="text-slate-700 font-medium mt-1 text-sm leading-relaxed">{tip}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-orange-300 hover:text-orange-600 p-1">
                <X size={16} />
            </button>
        </div>
    );
};
