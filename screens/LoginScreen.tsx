import { AntDesign } from '@expo/vector-icons';
import {
    ButtonBorderColor,
    ButtonFullBackgroundColor,
} from 'components/buttons';
import AppStyles, {
    BLACK,
    DEFAULT_MARGIN,
    DEFAULT_RADIUS,
    GREY,
    ORANGE,
    WHITE,
} from 'globals/AppStyles';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Ignore annoying warning comming from firebase
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secure_password, setSecurePassword] = useState(true);

    async function _handleLogin() {
        // try {
        //     if (email !== '' && password !== '') {
        //         const response = await signInWithEmailAndPassword(
        //             auth,
        //             email,
        //             password
        //         );
        //         const user = response.user;
        //         console.log('user = ', user);
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    }
    async function _handleSignUp() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            //     const response = await createUserWithEmailAndPassword(
            //         auth,
            //         email,
            //         password
            //     );
            //     const user = response.user;
            //     console.log('user = ', user);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={AppStyles.main_container}
            behavior="padding"
        >
            <View style={styles.inputs_and_buttons_container}>
                <View style={styles.text_input_container}>
                    <TextInput
                        style={styles.text_input}
                        placeholder={'Email'}
                        placeholderTextColor={GREY}
                        selectionColor={GREY}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        onSubmitEditing={() => {}}
                    />
                </View>
                <View
                    style={[
                        styles.text_input_container,
                        styles.text_input_and_icon_container,
                    ]}
                >
                    <TextInput
                        style={styles.text_input}
                        placeholder={'Password'}
                        placeholderTextColor={GREY}
                        selectionColor={GREY}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        onSubmitEditing={() => {}}
                        secureTextEntry={secure_password}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSecurePassword(!secure_password);
                        }}
                    >
                        <AntDesign
                            style={styles.eye_icon}
                            name={secure_password ? 'eyeo' : 'eye'}
                            size={20}
                            color={GREY}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttons_container}>
                    <ButtonFullBackgroundColor
                        color={ORANGE}
                        text={'login'}
                        onPressFunction={_handleLogin}
                    />
                    <ButtonBorderColor
                        color={ORANGE}
                        text={'register'}
                        onPressFunction={_handleSignUp}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    inputs_and_buttons_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_input_container: {
        backgroundColor: WHITE,
        margin: DEFAULT_MARGIN,
        borderRadius: DEFAULT_RADIUS,
        height: 40,
        width: '80%',
    },
    buttons_container: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_input_and_icon_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    eye_icon: {
        padding: 10,
    },
    text_input: {
        flex: 1,
        height: 30,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        color: BLACK,
    },
});
