import AppStyles, {
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
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';

// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
// } from 'firebase/auth';

// const auth = getAuth();

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
        // try {
        //     const response = await createUserWithEmailAndPassword(
        //         auth,
        //         email,
        //         password
        //     );
        //     const user = response.user;
        //     console.log('user = ', user);
        // } catch (error) {
        //     console.error(error);
        // }
    }
    return (
        <KeyboardAvoidingView style={styles.main_container} behavior="padding">
            <View style={styles.inputs_container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input_text}
                />
                <View style={styles.input_and_icon_container}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input_text}
                        secureTextEntry={secure_password}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSecurePassword(!secure_password);
                        }}
                    >
                        <AntDesign
                            style={styles.password_eye_icon}
                            name={secure_password ? 'eyeo' : 'eye'}
                            size={20}
                            color={GREY}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttons_container}>
                <TouchableOpacity onPress={_handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_handleSignUp}
                    style={[styles.button, styles.button_outline]}
                >
                    <Text style={styles.button_outline_text}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    main_container: {
        ...AppStyles.main_container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs_container: {
        width: '80%',
    },
    input_text: {
        backgroundColor: WHITE,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: DEFAULT_RADIUS,
        marginTop: 5,
    },
    buttons_container: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: ORANGE,
        width: '100%',
        padding: 15,
        borderRadius: DEFAULT_RADIUS,
        alignItems: 'center',
    },
    button_outline: {
        backgroundColor: WHITE,
        marginTop: 5,
        borderColor: ORANGE,
        borderWidth: 2,
    },
    buttonText: {
        color: WHITE,
        fontWeight: '700',
        fontSize: 16,
    },
    button_outline_text: {
        color: ORANGE,
        fontWeight: '700',
        fontSize: 16,
    },
    input_and_icon_container: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        margin: DEFAULT_MARGIN,
        borderRadius: DEFAULT_RADIUS,
    },
    password_eye_icon: {
        padding: 10,
    },
});
