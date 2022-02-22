import { ButtonSignOut } from 'components/buttons';
import AppStyles, { DEFAULT_MARGIN, ORANGE, WHITE } from 'globals/AppStyles';
import { RootBottomTabScreenProps } from 'navigations/NavigationsTypes';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from 'redux/Hooks';

export default function ProfilScreen({}: RootBottomTabScreenProps<'Profil'>) {
    const user = useAppSelector((state) => state.user);

    const image_url = user.profil_image_url
        ? user.profil_image_url
        : 'https://img2.freepng.fr/20180714/hxu/kisspng-user-profile-computer-icons-login-clip-art-profile-picture-icon-5b49de2f52aa71.9002514115315676633386.jpg';

    return (
        <View style={AppStyles.main_container}>
            <View style={styles.header_container}>
                <Image
                    source={{ uri: image_url }}
                    style={styles.profil_image}
                />
            </View>
            <View style={styles.content_container}>
                <Text>Username: {user.username}</Text>
                <Text>email: {user.email}</Text>
                <View style={{ width: '60%', paddingTop: DEFAULT_MARGIN }}>
                    <ButtonSignOut color={ORANGE}></ButtonSignOut>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content_container: {
        flex: 3,
        alignItems: 'center',
    },
    profil_image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});
