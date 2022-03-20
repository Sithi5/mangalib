import 'dotenv/config';

export default {
    expo: {
        name: 'MangaLib',
        description:
            'MangaLib is a free, open source application to help users list their mangas library, built with React-Native for Android and iOS devices.',
        slug: 'MangaLib',
        version: '1.0.2',
        orientation: 'portrait',
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
            supportsTablet: true,
            bundleIdentifier: 'com.mangalib',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            package: 'com.mangalib',
            versionCode: 3,
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
        },
    },
};
