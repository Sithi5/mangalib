import { LoginInput } from 'components/inputs';
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
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

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
        <KeyboardAvoidingView
            style={AppStyles.main_container}
            behavior="padding"
        >
            <View style={styles.inputs_and_buttons_container}>
                <View style={styles.text_input_container}>
                    <TextInput
                        style={styles.search_text_input}
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
                        style={styles.search_text_input}
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
                            style={styles.search_cross_icon}
                            name={secure_password ? 'eyeo' : 'eye'}
                            size={20}
                            color={GREY}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={styles.buttons_container}>
                <TouchableOpacity onPress={_handleLogin} style={styles.button}>
                    <Text style={styles.button_text}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={_handleSignUp}
                    style={[styles.button, styles.button_outline]}
                >
                    <Text style={styles.button_outline_text}>Register</Text>
                </TouchableOpacity>
            </View> */}
        </KeyboardAvoidingView>

        // <KeyboardAvoidingView style={styles.main_container} behavior="padding">
        //     <View style={styles.inputs_container}>
        //         <TextInput
        //             placeholder="Email"
        //             value={email}
        //             onChangeText={(text) => setEmail(text)}
        //             style={styles.input_text}
        //         />
        //         <View style={styles.input_and_icon_container}>
        //             <TextInput
        //                 placeholder="Password"
        //                 value={password}
        //                 onChangeText={(text) => setPassword(text)}
        //                 style={styles.input_text}
        //                 secureTextEntry={secure_password}
        //             />
        //             <TouchableOpacity
        //                 onPress={() => {
        //                     setSecurePassword(!secure_password);
        //                 }}
        //             >
        //                 <AntDesign
        //                     style={styles.password_eye_icon}
        //                     name={secure_password ? 'eyeo' : 'eye'}
        //                     size={20}
        //                     color={GREY}
        //                 />
        //             </TouchableOpacity>
        //         </View>
        //     </View>
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
    text_input_and_icon_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    search_cross_icon: {
        padding: 10,
    },
    search_text_input: {
        flex: 1,
        height: 30,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
        color: BLACK,
    },
});
