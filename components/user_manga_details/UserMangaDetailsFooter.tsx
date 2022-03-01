import { ButtonFullBackgroundColor } from 'components/buttons';
import { RED } from 'globals/AppStyles';
import React from 'react';
import { View } from 'react-native';

type Props = {
    removeMangaFromLibrary: () => Promise<void>;
};

export default function UserMangaDetailsFooter(props: Props) {
    const { removeMangaFromLibrary } = props;

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
            }}
        >
            <View style={{ width: '60%' }}>
                <ButtonFullBackgroundColor
                    color={RED}
                    onPressFunction={() => {
                        removeMangaFromLibrary();
                    }}
                    text={'Remove manga from library'}
                />
            </View>
        </View>
    );
}
