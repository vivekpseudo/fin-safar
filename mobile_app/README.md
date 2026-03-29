# FinSafar Mobile App - Financial Literacy for Bharat

FinSafar is a gamified financial literacy learning platform designed to empower users across India with essential financial knowledge. Through interactive modules, role-playing personas, and engaging mini-games, users learn about saving, investing, fraud prevention, and budgeting.

This is the React Native mobile application for **FinSafar**, bringing financial literacy for Bharat to iOS and Android devices. It mirrors the core functionality, gamified learning modules, and persona-based paths found in the web version, tailored for mobile touch experiences.

## 🚀 Features

*   **Role-Based Learning**: Tailored learning paths for different user personas:
    *   **Kisan (Farmer)**: Learn about crop loans, insurance (PMFBY), and market selling.
    *   **Entrepreneur**: Master the art of separating business and household finances.
    *   **Student**: Understand needs vs. wants and saving basics.
    *   **Young Professional**: Discover the power of compounding and retirement planning.
*   **Gamified Experience**:
    *   **Market Mandi**: Simulate selling crops at the fluctuating market prices.
    *   **Scam Smash**: Identify and block fraudulent messages and scams.
    *   **Budget Balancer**: Allocate funds effectively between different needs.
*   **Educational Resources**: Access a library of tips, videos, and documents.
*   **Progress Tracking**: Earn coins and badges as you complete modules and master skills.
*   **Multilingual Support**: (Architecture ready for multiple Indian languages).

## 📱 App Capability
- **Cross-Platform**: Built with React Native to support both iOS and Android.
- **Push Notifications**: Integrated via Firebase Cloud Messaging (FCM).
- **Offline Storage**: Uses AsyncStorage to save user progress, coins, and badges locally.
- **Multilingual Support**: Supports English and localized languages using `i18next`.
- **Interactive Modules**: Play Market Mandi, Scam Smash, and more to master financial skills.

## 🛠️ Tech Stack
- **Framework**: [React Native](https://reactnative.dev)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State & Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **Push Notifications**: [@react-native-firebase/messaging](https://rnfirebase.io/messaging/usage)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (`sudo gem install cocoapods`)

### Installation
1. Navigate to the mobile app directory:
   ```bash
   cd mobile_app
   ```
2. Install JavaScript dependencies (Use --legacy-peer-deps to avoid upstream conflicts if necessary):
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   ```
3. Install iOS Pods:
   ```bash
   cd ios
   pod install --repo-update
   cd ..
   ```

## 🏃‍♂️ Running the app

### iOS
Start the Metro Bundler and launch the iPhone simulator:
```bash
npx react-native run-ios
```
*(Alternatively, you can open `ios/FinSafarMobile.xcworkspace` in Xcode and click "Run")*

### Android
*Note: Before running on Android, ensure you have added your Firebase `google-services.json` file inside `android/app/`.*
```bash
npx react-native run-android
```

## 📦 Building & Deploying

### Deploying to iOS (App Store)
1. Open `ios/FinSafarMobile.xcworkspace` in Xcode.
2. Select your development team in the "Signing & Capabilities" tab.
3. Change the target device to **Any iOS Device (arm64)**.
4. Go to **Product > Archive**.
5. Once the archive is complete, the Organizer window will open, allowing you to Distribute the App to TestFlight or the App Store.

### Deploying to Android (Play Store)
1. Generate an upload key keystore if you haven't already.
2. Configure `gradle.properties` and `app/build.gradle` with your keystore information.
3. Generate a release AAB (Android App Bundle):
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
4. The generated `.aab` file will be located at `android/app/build/outputs/bundle/release/` which can be uploaded directly to the Google Play Console.
