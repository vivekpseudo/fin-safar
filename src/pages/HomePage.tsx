import React, { } from 'react';
import { Sprout, Home, BookOpen, Briefcase, Trophy, ShieldCheck, Coins, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { TipCard } from '@/components/ui/TipCard';

interface HomePageProps {
    userState: any;
    showTip: boolean;
    setShowTip: (show: boolean) => void;
    selectPersona: (id: string) => void;
}

const Personas = [
    { id: 'farmer', title: 'Kisan (Farmer)', icon: Sprout, desc: 'Manage crops, loans, and insurance.', color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'woman', title: 'Entrepreneur', icon: Home, desc: 'Balance household & business budgets.', color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'student', title: 'Student', icon: BookOpen, desc: 'Learn to save pocket money.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'young_adult', title: 'Professional', icon: Briefcase, desc: 'Plan salary, tax, and retirement.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export const HomePage: React.FC<HomePageProps> = ({ userState, showTip, setShowTip, selectPersona }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2 mt-8">
                <h2 className="text-3xl font-extrabold text-slate-800">Welcome to Bharat's Finance Quest</h2>
                <p className="text-slate-600 mb-6">Choose your character to start your journey towards financial freedom.</p>

                {/* TIP OF THE DAY */}
                {userState.notifications?.dailyTips && showTip && (
                    <div className="max-w-lg mx-auto text-left">
                        <TipCard onClose={() => setShowTip(false)} />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Personas.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => selectPersona(p.id)}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-left border border-slate-100 flex items-start gap-4 group"
                    >
                        <div className={`p-3 rounded-lg ${p.bg} ${p.color} group-hover:scale-110 transition-transform`}>
                            <p.icon size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{p.title}</h3>
                            <p className="text-sm text-slate-500 leading-snug">{p.desc}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* BADGES SHOWCASE */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 mt-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Trophy size={18} className="text-yellow-500" /> Your Achievements
                </h3>
                <div className="grid grid-cols-4 gap-2">
                    <Badge icon={Sprout} label="Harvest" earned={userState.badges.includes("Harvest Hero")} />
                    <Badge icon={ShieldCheck} label="Safe" earned={userState.badges.includes("Cyber Guardian") || userState.badges.includes("Safety Star")} />
                    <Badge icon={Coins} label="Saver" earned={userState.badges.includes("Savings Scout")} />
                    <Badge icon={TrendingUp} label="Wealthy" earned={userState.badges.includes("Wealth Wizard")} />
                </div>
            </div>
        </div>
    );
};
