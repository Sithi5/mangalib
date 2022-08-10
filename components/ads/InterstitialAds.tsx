import { AdMobInterstitial } from 'expo-ads-admob';
import { Platform } from 'react-native';

export default async function InterstitialAds() {
    // Android interstitialId: ca-app-pub-2983445386454572/3716832589
    // Android interstitialId for test: ca-app-pub-3940256099942544/1033173712
    const interstitialAdId =
        Platform.OS === 'android'
            ? 'ca-app-pub-2983445386454572/3716832589'
            : '';
    // Display an interstitial
    try {
        await AdMobInterstitial.setAdUnitID(interstitialAdId);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    } catch (error) {}
}
