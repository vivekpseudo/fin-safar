import React, { useState, useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface TipCardProps {
    onClose: () => void;
}

export const TipCard: React.FC<TipCardProps> = ({ onClose }) => {
    const [tip, setTip] = useState("");

    const tips = [
        "Save at least 20% of your income every month.",
        "Never share your OTP or PIN with anyone, even bank officials.",
        "Start investing early to benefit from the magic of compounding.",
        "Differentiate between Needs (essentials) and Wants (desires).",
        "Keep business cash and household expenses in separate accounts.",
        "Review your bank statements monthly to catch unauthorized charges.",
        "Build an emergency fund covering 3-6 months of expenses.",
        "Crop insurance (PMFBY) protects you from unexpected weather losses.",
        "Use a strong password and change it regularly.",
        "Avoid taking loans for luxury items; save for them instead."
    ];

    useEffect(() => {
        setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, []);

    return (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl shadow-sm mb-6 flex justify-between items-start animate-slideUp">
            <div className="flex gap-3">
                <div>
                    <div className="bg-orange-100 p-2 rounded-full mt-1">
                        <Lightbulb size={20} className="text-orange-600" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-orange-800 text-xs uppercase tracking-wide">Tip of the Day</h4>
                    <p className="text-slate-700 font-medium mt-1 text-sm leading-relaxed">{tip}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-orange-300 hover:text-orange-600 p-1">
                <X size={16} />
            </button>
        </div>
    );
};
