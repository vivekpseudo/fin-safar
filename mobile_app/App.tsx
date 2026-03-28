import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import './src/i18n/i18n'; // Initialize i18n
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { requestUserPermission, notificationListener } from './src/services/notificationService';
import messaging from '@react-native-firebase/messaging';

const MainApp = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, colors } = useTheme();

  useEffect(() => {
    // Setup Firebase Push Notifications
    requestUserPermission();
    notificationListener();

    // Background message handler needs to be registered early
    // For a real app this should ideally be outside the React cycle (e.g., index.js)
    // but demonstrating it here simply.
  }, []);

  const changeLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const testPush = async () => {
    // A proper push notification needs to be sent from the Firebase console or server
    // This just shows we can interact with the API. 
    // Logging token again to show it works
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    Alert.alert(t('pushNotification') + " Setup - check console for FCM Token");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      marginBottom: 15,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.title}>{t('welcome')}</Text>

        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>{t('toggleTheme')} ({theme})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={changeLanguage}>
          <Text style={styles.buttonText}>{t('changeLanguage')} ({i18n.language})</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF9500' }]} onPress={testPush}>
          <Text style={styles.buttonText}>{t('testNotification')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

import { AppNavigation } from './src/App';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
