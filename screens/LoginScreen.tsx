import AppStyles, { DEFAULT_RADIUS, ORANGE, WHITE } from 'globals/AppStyles';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function _handleLogin() {}
    function _handleSignUp() {}
    return (
        <KeyboardAvoidingView style={styles.main_container} behavior="padding">
            <View style={styles.inputs_container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input_text}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input_text}
                    secureTextEntry
                />
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
});
