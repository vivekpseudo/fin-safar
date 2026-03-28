import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, User as UserIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

// Services
import { UserService, User as UserState } from './services/UserService';

// Screens & Pages
import { SplashScreen } from './screens/onboarding/SplashScreen';
import { LanguageSelection } from './features/onboarding/LanguageSelection';
import { OnboardingCarousel } from './features/onboarding/OnboardingCarousel';
import { AuthScreen } from './features/onboarding/AuthScreen';
import { HomePage } from './pages/HomePage';
import { LearnPage } from './pages/LearnPage';
import { ProfilePage } from './pages/ProfilePage';

// Modules
import { FarmerModule } from './features/modules/FarmerModule';
import { WomanModule } from './features/modules/WomanModule';
import { StudentModule } from './features/modules/StudentModule';
import { YoungAdultModule } from './features/modules/YoungAdultModule';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = ({ userState, setUserState, onLogout }: any) => {
    const { t } = useTranslation();
    const [showTip, setShowTip] = useState(true);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'HomeTab') return <Home color={color} size={size} />;
                    if (route.name === 'LearnTab') return <BookOpen color={color} size={size} />;
                    if (route.name === 'ProfileTab') return <UserIcon color={color} size={size} />;
                    return null;
                },
                tabBarActiveTintColor: '#ea580c',
                tabBarInactiveTintColor: '#64748b',
                headerShown: false,
                tabBarLabelStyle: { fontWeight: 'bold' }
            })}
        >
            <Tab.Screen
                name="HomeTab"
                options={{ title: t('app.home') || 'Home' }}
            >
                {(props) => (
                    <HomePage
                        {...props}
                        userState={userState}
                        showTip={showTip}
                        setShowTip={setShowTip}
                        selectPersona={(id) => props.navigation.navigate('ModuleParams', { personaId: id })}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen
                name="LearnTab"
                component={LearnPage}
                options={{ title: t('app.learn') || 'Learn' }}
            />
            <Tab.Screen
                name="ProfileTab"
                options={{ title: t('app.profile') || 'Profile' }}
            >
                {(props) => (
                    <ProfilePage
                        {...props}
                        userState={userState}
                        setUserState={setUserState}
                        onLogout={onLogout}
                    />
                )}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export const AppNavigation = () => {
    const { i18n } = useTranslation();
    const [userState, setUserState] = useState<UserState | null>(null);
    const [authStep, setAuthStep] = useState<'splash' | 'language' | 'carousel' | 'auth' | 'done'>('splash');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            let user = await UserService.getCurrentUser();
            if (!user) {
                user = await UserService.createGuestUser();
            }
            if (user.language) i18n.changeLanguage(user.language);
            setUserState(user);
            setIsLoaded(true);
        };
        init();

        const subscription = UserService.observeUser().subscribe((users: UserState[]) => {
            if (users.length > 0) {
                const u = users[0];
                setUserState(u);
                if (u.language && u.language !== i18n.language) {
                    i18n.changeLanguage(u.language);
                }
            }
        });

        return () => { subscription.unsubscribe(); };
    }, []);

    const handleSplashFinish = () => {
        if (userState?.isLoggedIn) {
            setAuthStep('done');
        } else {
            setAuthStep('language');
        }
    };

    const handleLanguageSelect = (lang: any) => {
        i18n.changeLanguage(lang.code);
        UserService.updateUser({ language: lang.code });
        setAuthStep('carousel');
    };

    const handleLogin = (phone: string) => {
        UserService.updateUser({ isLoggedIn: true, phone: phone, name: 'Guest User' });
        setAuthStep('done');
    };

    const handleLogout = () => {
        UserService.updateUser({ isLoggedIn: false });
        setAuthStep('auth');
    };

    const handleModuleComplete = (coinsEarned: number, badgeName: string, navigation: any) => {
        if (!userState) return;
        const hasBadge = userState.badges.includes(badgeName);
        const newBadges = hasBadge ? userState.badges : [...userState.badges, badgeName];
        const newCoins = userState.coins + coinsEarned;
        UserService.updateUser({ coins: newCoins, badges: newBadges });
        navigation.goBack();
    };

    if (!isLoaded || !userState) return null;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                {authStep === 'splash' && (
                    <Stack.Screen name="Splash">
                        {(props) => <SplashScreen {...props} onFinish={handleSplashFinish} />}
                    </Stack.Screen>
                )}
                {authStep === 'language' && (
                    <Stack.Screen name="Language">
                        {(props) => <LanguageSelection {...props} onSelect={handleLanguageSelect} />}
                    </Stack.Screen>
                )}
                {authStep === 'carousel' && (
                    <Stack.Screen name="Carousel">
                        {(props) => <OnboardingCarousel {...props} onNext={() => setAuthStep('auth')} />}
                    </Stack.Screen>
                )}
                {authStep === 'auth' && (
                    <Stack.Screen name="Auth">
                        {(props) => <AuthScreen {...props} onLogin={handleLogin} />}
                    </Stack.Screen>
                )}
                {authStep === 'done' && (
                    <>
                        <Stack.Screen name="MainTabs">
                            {(props) => (
                                <MainTabs
                                    {...props}
                                    userState={userState}
                                    setUserState={UserService.updateUser.bind(UserService)}
                                    onLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen
                            name="ModuleParams"
                            options={{ headerShown: true, title: 'Journey', headerBackTitle: 'Back', headerTintColor: '#ea580c' }}
                        >
                            {({ route, navigation }: any) => {
                                const { personaId } = route.params;
                                const onComplete = (score: number, badge: string) => handleModuleComplete(score, badge, navigation);
                                switch (personaId) {
                                    case 'farmer': return <FarmerModule onComplete={onComplete} />;
                                    case 'woman': return <WomanModule onComplete={onComplete} />;
                                    case 'student': return <StudentModule onComplete={onComplete} />;
                                    case 'young_adult': return <YoungAdultModule onComplete={onComplete} />;
                                    default: return <HomePage userState={userState} showTip={false} setShowTip={() => { }} selectPersona={() => { }} />;
                                }
                            }}
                        </Stack.Screen>
                        <Stack.Screen
                            name="LanguageSelection"
                            options={{ headerShown: true, title: 'Select Language', headerBackTitle: 'Back', headerTintColor: '#ea580c' }}
                        >
                            {(props) => (
                                <LanguageSelection
                                    {...props}
                                    onSelect={(lang: any) => {
                                        i18n.changeLanguage(lang.code);
                                        UserService.updateUser({ language: lang.code });
                                        props.navigation.goBack();
                                    }}
                                />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
