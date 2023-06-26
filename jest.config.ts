export default {
    moduleDirectories: ['node_modules', '<rootDir>'],
    setupFilesAfterEnv: ['./jest.setup.ts'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?|react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@firebase|firebase|firebaseapp|@react-native-firebase|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
        'node_modules/jest-runner/build/index.js',
    ],
};
