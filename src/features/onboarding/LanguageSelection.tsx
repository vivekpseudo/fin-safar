import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Language {
    code: string;
    label: string;
    native: string;
}

interface LanguageSelectionProps {
    onSelect: (lang: Language) => void;
}

export const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onSelect }) => {
    const { t } = useTranslation();

    const languages: Language[] = [
        { code: 'en', label: 'English', native: 'English' },
        { code: 'hi', label: 'Hindi', native: 'हिंदी' },
        { code: 'mr', label: 'Marathi', native: 'मराठी' },
        { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
        { code: 'te', label: 'Telugu', native: 'తెలుగు' },
        { code: 'kn', label: 'Kannada', native: 'कन्नड़' },
    ];

    return (
        <div className="w-full min-h-[60vh] bg-slate-50 p-6 flex flex-col animate-slideUp">
            <div className="mb-6 mt-4">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Languages className="text-orange-600" /> {t('language.select')}
                </h2>
                <p className="text-slate-500">{t('language.choose')}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onSelect(lang)}
                        className="group bg-white p-4 rounded-xl shadow-sm border-2 border-transparent hover:border-orange-600 hover:bg-orange-600 transition-all text-left"
                    >
                        <div className="text-lg font-bold text-slate-800 group-hover:text-white">{lang.native}</div>
                        <div className="text-sm text-slate-400 group-hover:text-orange-100">{lang.label}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
