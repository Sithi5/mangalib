import 'dotenv/config';

export default {
    expo: {
        name: 'MangaLib',
        description:
            'MangaLib is an open source application to help users list their mangas library, built with React-Native for Android and iOS devices.',
        slug: 'MangaLib',
        version: '1.1.0',
        icon: './assets/icon.png',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'cover',
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        primaryColor: '#ff7400',
        assetBundlePatterns: ['**/*'],
        ios: {
            config: {
                usesNonExemptEncryption: false,
            },
            supportsTablet: true,
            bundleIdentifier: 'com.mangalib',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            package: 'com.mangalib',
            config: {
                googleMobileAdsAppId: 'ca-app-pub-2983445386454572~5447016533',
            },
        },
        web: {
            favicon: './assets/favicon.png',
        },
        extra: {
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            eas: {
                projectId: '7037347c-02ae-4482-9da4-c4f0bf21622b',
            },
        },
    },
};
