import { Alert } from 'react-native';

type AlertRemoveMangaFromLibraryYesFunction = () => void;

type Props = {
    alertYesFunction: AlertRemoveMangaFromLibraryYesFunction;
};

export default function alertRemoveMangaFromLibrary(props: Props) {
    const { alertYesFunction } = props;

    return Alert.alert(
        'Remove manga from library',
        'Are you sure you want to remove this manga from your library?',
        [
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: () => {
                    alertYesFunction();
                },
            },
        ]
    );
}
