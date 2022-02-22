import { ButtonSignOut } from 'components/buttons';
import { ORANGE } from 'globals/AppStyles';
import { RootBottomTabScreenProps } from 'navigations/NavigationsTypes';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'redux/Hooks';

export default function ProfilScreen({}: RootBottomTabScreenProps<'Profil'>) {
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
