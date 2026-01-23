import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
    icon: LucideIcon;
    label: string;
    earned: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ icon: Icon, label, earned }) => (
    <div className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 ${earned ? "border-yellow-400 bg-yellow-50" : "border-slate-200 bg-slate-50 grayscale opacity-60"}`}>
        <div className={`p-2 rounded-full mb-2 ${earned ? "bg-yellow-100 text-yellow-600" : "bg-slate-200 text-slate-400"}`}>
            <Icon size={24} />
        </div>
        <span className="text-xs font-bold text-center text-slate-700">{label}</span>
    </div>
);
