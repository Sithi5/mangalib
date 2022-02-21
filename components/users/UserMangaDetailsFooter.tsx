import { ButtonFullBackgroundColor } from 'components/buttons';
import { RED } from 'globals/AppStyles';
import React from 'react';

type Props = {
    removeMangaFromLibrary: () => void;
};

export default function UserMangaDetailsFooter(props: Props) {
    const { removeMangaFromLibrary } = props;

    return (
        <ButtonFullBackgroundColor
            color={RED}
            onPressFunction={() => {
                removeMangaFromLibrary();
            }}
            text={'Remove manga from library'}
        />
    );
}
