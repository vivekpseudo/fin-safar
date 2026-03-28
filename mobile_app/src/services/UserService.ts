import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
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

const DEFAULT_USER: User = {
    name: 'Guest User',
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
};

let currentUser: User = { ...DEFAULT_USER };
const listeners = new Set<(users: User[]) => void>();

// Load initial data
AsyncStorage.getItem('user_data').then(data => {
    if (data) {
        currentUser = JSON.parse(data);
        listeners.forEach(l => l([currentUser]));
    }
}).catch(e => console.error("Error loading user data", e));

export const UserService = {
    async getCurrentUser(): Promise<User | null> {
        return currentUser;
    },
    
    async createGuestUser(): Promise<User> {
        currentUser = { ...DEFAULT_USER };
        await AsyncStorage.setItem('user_data', JSON.stringify(currentUser));
        listeners.forEach(l => l([currentUser]));
        return currentUser;
    },
    
    async updateUser(updates: Partial<User>) {
        currentUser = { ...currentUser, ...updates };
        await AsyncStorage.setItem('user_data', JSON.stringify(currentUser));
        listeners.forEach(l => l([currentUser]));
    },
    
    async logout() {
        await this.updateUser({ isLoggedIn: false });
    },
    
    observeUser() {
        return {
            subscribe: (callback: (users: User[]) => void) => {
                listeners.add(callback);
                callback([currentUser]);
                return {
                    unsubscribe: () => { listeners.delete(callback); }
                };
            }
        };
    }
};
