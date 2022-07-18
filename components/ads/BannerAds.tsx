import { AdMobBanner } from 'expo-ads-admob';
import React from 'react';
import { Platform, View } from 'react-native';

export default function BannerAds() {
    // Android banner: ca-app-pub-2983445386454572/2461529038
    const bannerAdId =
        Platform.OS === 'android'
            ? 'ca-app-pub-2983445386454572/2461529038'
            : '';
    // Display a banner
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={bannerAdId} // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds={false} // true or false
                style={{
                    padding: 30,
                }}
            />
        </View>
    );
}
