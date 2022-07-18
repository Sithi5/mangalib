import { AdMobInterstitial } from 'expo-ads-admob';
import { Platform } from 'react-native';

export default async function InterstitialAds() {
    // Android interstitialId: ca-app-pub-2983445386454572/2461529038
    // Android interstitialId for test: ca-app-pub-3940256099942544/1033173712
    const interstitialAdId =
        Platform.OS === 'android'
            ? 'ca-app-pub-2983445386454572/2461529038'
            : '';
    // Display an interstitial
    try {
        await AdMobInterstitial.setAdUnitID(interstitialAdId); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    } catch (error) {}
}
