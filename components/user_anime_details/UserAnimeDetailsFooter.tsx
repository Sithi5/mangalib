import { ButtonFullBackgroundColor } from 'components/buttons';
import { RED } from 'globals/AppStyles';
import React from 'react';
import { View } from 'react-native';

type Props = {
    removeAnimeFromWatchList: () => Promise<void>;
};

export default function UserAnimeDetailsFooter(props: Props) {
    const { removeAnimeFromWatchList } = props;

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
                        removeAnimeFromWatchList();
                    }}
                    text={'Remove anime from your watchlist'}
                />
            </View>
        </View>
    );
}
