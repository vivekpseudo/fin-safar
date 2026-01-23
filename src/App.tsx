import React, { useState, useEffect } from 'react';
import { TrendingUp, Home, BookOpen, User, Coins, ArrowRight } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Features
import { SplashScreen } from './features/onboarding/SplashScreen';
import { OnboardingCarousel } from './features/onboarding/OnboardingCarousel';
import { LanguageSelection } from './features/onboarding/LanguageSelection';
import { AuthScreen } from './features/onboarding/AuthScreen';
import { FarmerModule } from './features/modules/FarmerModule';
import { WomanModule } from './features/modules/WomanModule';
import { StudentModule } from './features/modules/StudentModule';
import { YoungAdultModule } from './features/modules/YoungAdultModule';

// Pages
import { HomePage } from './pages/HomePage';
import { Link } from 'react-router-dom';
import { Card } from './components/ui/Card';
import { LearnPage } from './pages/LearnPage';
import { ProfilePage } from './pages/ProfilePage';

// Types
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

const AppContent: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // App State
    const [authStep, setAuthStep] = useState<'splash' | 'language' | 'carousel' | 'auth' | 'done'>('splash');
    const [userState, setUserState] = useState<UserState>({
        name: '',
        coins: 0,
        badges: [],
        isLoggedIn: false,
        language: 'en',
        phone: '',
        notifications: {
            dailyTips: true,
            appUpdates: true,
            reminders: false
        }
    });
    const [showTip, setShowTip] = useState(true);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem('finSafarUser');
        if (saved) {
            const parsed = JSON.parse(saved);
            setUserState(prev => ({
                ...prev,
                ...parsed,
                notifications: parsed.notifications || prev.notifications
            }));
            if (parsed.language) {
                i18n.changeLanguage(parsed.language);
            }
        }
    }, [i18n]);

    // Sync language changes
    useEffect(() => {
        if (userState.language) {
            i18n.changeLanguage(userState.language);
        }
    }, [userState.language, i18n]);

    // Handlers
    const saveProgress = (newState: UserState) => {
        setUserState(newState);
        localStorage.setItem('finSafarUser', JSON.stringify(newState));
    };

    const handleSplashFinish = () => {
        if (userState.isLoggedIn) {
            setAuthStep('done');
            navigate('/');
        } else {
            setAuthStep('language');
        }
    };

    const handleLanguageSelect = (lang: any) => {
        setUserState({ ...userState, language: lang.code });
        setAuthStep('carousel');
    };

    const handleLogin = (phone: string) => {
        const newState = { ...userState, isLoggedIn: true, phone: phone, name: 'Guest User' };
        saveProgress(newState);
        setAuthStep('done');
        navigate('/');
    };

    const handleLogout = () => {
        const newState = { ...userState, isLoggedIn: false };
        saveProgress(newState);
        setAuthStep('auth');
        navigate('/');
    };

    const handleModuleComplete = (coinsEarned: number, badgeName: string) => {
        const hasBadge = userState.badges.includes(badgeName);
        const newState = {
            ...userState,
            coins: userState.coins + coinsEarned,
            badges: hasBadge ? userState.badges : [...userState.badges, badgeName]
        };
        saveProgress(newState);
    };

    const handleSettingsLanguageSelect = (lang: any) => {
        setUserState({ ...userState, language: lang.code });
        saveProgress({ ...userState, language: lang.code });
        navigate('/profile');
    };

    // Render Logic for specific routes that need layout vs full screen
    const isFullScreen = authStep !== 'done';

    if (authStep === 'splash') return <SplashScreen onFinish={handleSplashFinish} />;
    if (authStep === 'language') return <LanguageSelection onSelect={handleLanguageSelect} />;
    if (authStep === 'carousel') return <OnboardingCarousel onNext={() => setAuthStep('auth')} />;
    if (authStep === 'auth') return <AuthScreen onLogin={handleLogin} />;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
            {/* HEADER */}
            <header className="bg-white shadow-sm sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link className="flex items-center gap-2 cursor-pointer" to="/">
                        <div className="bg-orange-600 text-white p-2 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                        <h1 className="font-bold text-xl tracking-tight">{t('app.name')}</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${location.pathname === '/' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <Home size={18} /> {t('app.home')}
                        </Link>
                        <Link
                            to="/learn"
                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${location.pathname === '/learn' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <BookOpen size={18} /> {t('app.learn')}
                        </Link>
                        <Link
                            to="/profile"
                            className={`flex items-center gap-2 text-sm font-bold transition-colors ${location.pathname === '/profile' ? 'text-orange-600' : 'text-slate-500 hover:text-slate-800'}`}
                        >
                            <User size={18} /> {t('app.profile')}
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                        <Coins size={16} className="text-yellow-500" />
                        <span className="font-bold text-sm">{userState.coins}</span>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="max-w-3xl mx-auto p-4 md:p-6">
                <Routes>
                    <Route path="/" element={<HomePage
                        userState={userState}
                        showTip={showTip}
                        setShowTip={setShowTip}
                        selectPersona={(id) => navigate(`/module/${id}`)}
                    />} />
                    <Route path="/learn" element={<LearnPage />} />
                    <Route path="/profile" element={<ProfilePage userState={userState} setUserState={saveProgress} onLogout={handleLogout} />} />
                    <Route path="/language" element={<LanguageSelection onSelect={handleSettingsLanguageSelect} />} />

                    {/* Dynamic Modules Route */}
                    <Route path="/module/:personaId" element={
                        <div className="animate-slideUp">
                            <div className="flex items-center gap-2 mb-6">
                                <Link to="/" className="p-2 hover:bg-slate-200 rounded-full">
                                    <ArrowRight className="rotate-180" size={20} />
                                </Link>
                                <h2 className="text-xl font-bold capitalize">Journey</h2>
                            </div>
                            <Card className="min-h-[400px]">
                                <ModuleWrapper onComplete={handleModuleComplete} />
                            </Card>
                        </div>
                    } />
                </Routes>
            </main>

            {/* FOOTER (Mobile Nav) */}
            <div className="fixed bottom-0 w-full bg-white border-t border-slate-200 p-2 md:hidden flex justify-around items-center text-xs font-semibold text-slate-500">
                <Link to="/" className={`flex flex-col items-center p-2 ${(location.pathname === '/' || location.pathname.startsWith('/module')) ? 'text-orange-600' : ''}`}>
                    <Home size={20} />
                    <span>{t('app.home')}</span>
                </Link>
                <Link to="/learn" className={`flex flex-col items-center p-2 ${location.pathname === '/learn' ? 'text-orange-600' : ''}`}>
                    <BookOpen size={20} />
                    <span>{t('app.learn')}</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center p-2 ${location.pathname === '/profile' ? 'text-orange-600' : ''}`}>
                    <User size={20} />
                    <span>{t('app.profile')}</span>
                </Link>
            </div>
            <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes slideUp {
                  from { transform: translateY(20px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
                }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                .animate-slideUp { animation: slideUp 0.5s ease-out; }
            `}</style>
        </div>
    );
};

// Helper component to render correct module based on URL params
import { useParams } from 'react-router-dom';

const ModuleWrapper = ({ onComplete }: { onComplete: (score: number, badge: string) => void }) => {
    const { personaId } = useParams();

    switch (personaId) {
        case 'farmer': return <FarmerModule onComplete={onComplete} />;
        case 'woman': return <WomanModule onComplete={onComplete} />;
        case 'student': return <StudentModule onComplete={onComplete} />;
        case 'young_adult': return <YoungAdultModule onComplete={onComplete} />;
        default: return <Navigate to="/" />;
    }
}

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
