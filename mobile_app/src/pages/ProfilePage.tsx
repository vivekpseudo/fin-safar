import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User, Settings, Bell, ToggleRight, ToggleLeft, RefreshCw, Timer, Languages, ChevronRight } from 'lucide-react-native';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

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
    const navigation = useNavigation<any>();

    const notifications = userState.notifications || { dailyTips: true, appUpdates: true, reminders: false };

    const toggleNotif = (key: keyof typeof notifications) => {
        const updatedNotifs = { ...notifications, [key]: !notifications[key] };
        const updatedUser = { ...userState, notifications: updatedNotifs };
        setUserState(updatedUser);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Profile Header */}
            <View style={styles.headerCard}>
                <View style={styles.avatarContainer}>
                    <User size={48} color="#ea580c" />
                </View>
                <Text style={styles.userName}>{userState.name || "Ramesh Kumar"}</Text>
                <Text style={styles.userRole}>{t('profile.explorer')}</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{userState.coins}</Text>
                        <Text style={styles.statLabel}>{t('profile.coins')}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{userState.badges.length}</Text>
                        <Text style={styles.statLabel}>{t('profile.badges')}</Text>
                    </View>
                </View>
            </View>

            {/* Settings */}
            <View style={styles.settingsCard}>
                <View style={styles.settingsHeader}>
                    <Settings size={20} color="#1e293b" />
                    <Text style={styles.settingsTitle}>{t('settings.title')}</Text>
                </View>

                <View style={styles.settingsContent}>
                    {/* Language Setting */}
                    <TouchableOpacity
                        style={styles.settingRow}
                        onPress={() => navigation.navigate('LanguageSelection')}
                    >
                        <View style={styles.settingLeft}>
                            <Languages size={20} color="#94a3b8" />
                            <Text style={styles.settingText}>{t('settings.language')}</Text>
                        </View>
                        <View style={styles.settingRight}>
                            <Text style={styles.settingValueText}>{userState.language}</Text>
                            <ChevronRight size={20} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Bell size={20} color="#94a3b8" />
                            <Text style={styles.settingText}>{t('settings.dailyTips')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleNotif('dailyTips')}>
                            {notifications.dailyTips ? <ToggleRight size={32} color="#16a34a" /> : <ToggleLeft size={32} color="#cbd5e1" />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <RefreshCw size={20} color="#94a3b8" />
                            <Text style={styles.settingText}>{t('settings.appUpdates')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleNotif('appUpdates')}>
                            {notifications.appUpdates ? <ToggleRight size={32} color="#16a34a" /> : <ToggleLeft size={32} color="#cbd5e1" />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Timer size={20} color="#94a3b8" />
                            <Text style={styles.settingText}>{t('settings.reminders')}</Text>
                        </View>
                        <TouchableOpacity onPress={() => toggleNotif('reminders')}>
                            {notifications.reminders ? <ToggleRight size={32} color="#16a34a" /> : <ToggleLeft size={32} color="#cbd5e1" />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Button
                variant="outline"
                onClick={onLogout}
                className="logout-button" // Handled by Button component's variant if needed, but styling directly is better
                style={styles.logoutButton}
                textStyle={styles.logoutButtonText}
            >
                {t('settings.logout')}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
    },
    headerCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 24,
        marginTop: 40,
    },
    avatarContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#ffedd5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    userRole: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    statsRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 24,
        gap: 16,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    statLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64748b',
        textTransform: 'uppercase',
        marginTop: 4,
    },
    settingsCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginBottom: 24,
    },
    settingsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    settingsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        marginLeft: 8,
    },
    settingsContent: {
        gap: 16,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#334155',
        marginLeft: 12,
    },
    settingRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingValueText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#94a3b8',
        marginRight: 8,
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginVertical: 4,
    },
    logoutButton: {
        borderColor: '#fee2e2',
        backgroundColor: '#fef2f2',
    },
    logoutButtonText: {
        color: '#ef4444',
    }
});
