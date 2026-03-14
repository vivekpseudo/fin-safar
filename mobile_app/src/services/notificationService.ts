import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

export const requestUserPermission = async () => {
    if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            getFcmToken();
        }
    } else {
        // Android 13+ requires explicit permission request
        // Ensure you add <uses-permission android:name="android.permission.POST_NOTIFICATIONS"/> in AndroidManifest.xml
        try {
            const authStatus = await messaging().requestPermission();
            if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                getFcmToken();
            }
        } catch (e) {
            console.warn("Could not ask for notification permission on Android", e);
            getFcmToken(); // Still try to get token, older Androids don't need explicit request
        }
    }
};

const getFcmToken = async () => {
    try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log('Firebase Cloud Messaging Token:', fcmToken);
            // Here you would typically send this token to your backend
        } else {
            console.log('Failed', 'No token received');
        }
    } catch (error) {
        console.log('Error fetching FCM token', error);
    }
};

export const notificationListener = () => {
    // Listen for messages while app is in the foreground
    messaging().onMessage(async remoteMessage => {
        console.log('A new FCM message arrived in foreground!', JSON.stringify(remoteMessage));
        Alert.alert(
            remoteMessage.notification?.title || 'New Notification',
            remoteMessage.notification?.body || 'You have a new message'
        );
    });

    // Listen for background message when app is in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    // Check whether an initial notification is available (app opened from quit state)
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });
};
