import React from 'react';
import { User, Settings, Bell, ToggleRight, ToggleLeft, RefreshCw, Timer, Languages, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Type definition for UserState (needs to be shared potentially)
interface UserState {
    name: string;
    coins: number;
    badges: string[];
    isLoggedIn: boolean;
    language: string;
    phone: string;
    notifications: {
        dailyTips: boolean;
        appUpdates: boolean;
        reminders: boolean;
    };
}

interface ProfilePageProps {
    userState: UserState;
    setUserState: (state: UserState) => void;
    onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userState, setUserState, onLogout }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Use notifications from userState
    const notifications = userState.notifications || { dailyTips: true, appUpdates: true, reminders: false };

    const toggleNotif = (key: keyof typeof notifications) => {
        const updatedNotifs = { ...notifications, [key]: !notifications[key] };
        const updatedUser = { ...userState, notifications: updatedNotifs };
        setUserState(updatedUser);
        localStorage.setItem('finSafarUser', JSON.stringify(updatedUser)); // Ensure persistence
    };

    return (
        <div className="space-y-6 animate-fadeIn pb-24">
            {/* Profile Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                    <User size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{userState.name || "Ramesh Kumar"}</h2>
                <p className="text-slate-500 text-sm">{t('profile.explorer')}</p>

                <div className="flex gap-4 mt-6 w-full">
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-xl font-bold text-slate-800">{userState.coins}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">{t('profile.coins')}</div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-xl font-bold text-slate-800">{userState.badges.length}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">{t('profile.badges')}</div>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <Settings size={20} /> {t('settings.title')}
                </h3>

                <div className="space-y-4">
                    {/* Language Setting */}
                    <div
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => navigate('/language')}
                    >
                        <div className="flex items-center gap-3">
                            <Languages className="text-slate-400 group-hover:text-orange-600 transition-colors" size={20} />
                            <span className="text-slate-700 font-medium group-hover:text-orange-700 transition-colors">{t('settings.language')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="text-sm font-semibold uppercase">{userState.language}</span>
                            <ChevronRight size={20} />
                        </div>
                    </div>

                    <hr className="border-slate-100" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Bell className="text-slate-400" size={20} />
                            <span className="text-slate-700 font-medium">{t('settings.dailyTips')}</span>
                        </div>
                        <button onClick={() => toggleNotif('dailyTips')} className={`${notifications.dailyTips ? 'text-green-600' : 'text-slate-300'}`}>
                            {notifications.dailyTips ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <RefreshCw className="text-slate-400" size={20} />
                            <span className="text-slate-700 font-medium">{t('settings.appUpdates')}</span>
                        </div>
                        <button onClick={() => toggleNotif('appUpdates')} className={`${notifications.appUpdates ? 'text-green-600' : 'text-slate-300'}`}>
                            {notifications.appUpdates ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Timer className="text-slate-400" size={20} />
                            <span className="text-slate-700 font-medium">{t('settings.reminders')}</span>
                        </div>
                        <button onClick={() => toggleNotif('reminders')} className={`${notifications.reminders ? 'text-green-600' : 'text-slate-300'}`}>
                            {notifications.reminders ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            <Button variant="outline" onClick={onLogout} className="text-red-500 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600">{t('settings.logout')}</Button>
        </div>
    );
};
