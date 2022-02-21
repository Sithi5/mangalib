import { ButtonFullBackgroundColor, ButtonSignOut } from 'components/buttons';
import AppStyles, { ORANGE } from 'globals/AppStyles';
import { ProfilStackScreenProps } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'redux/Hooks';

export default function ProfilScreen({}: ProfilStackScreenProps<'Profil'>) {
    const user = useAppSelector((state) => state.user);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text>Welcome {user.username}</Text>
            <Text>email: {user.email}</Text>
            <ButtonSignOut color={ORANGE}></ButtonSignOut>
        </View>
    );
}

const styles = StyleSheet.create({});
