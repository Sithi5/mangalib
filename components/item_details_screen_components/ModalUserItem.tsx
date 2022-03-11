import { BlurView } from 'expo-blur';
import { BLACK, WHITE } from 'globals/AppStyles';
import React from 'react';
import {
    Alert,
    ImageBackground,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
    show_library_modal: boolean;
    setShowLibraryModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalUserItem(props: Props) {
    const { show_library_modal, setShowLibraryModal } = props;

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={show_library_modal}
                onRequestClose={() => {
                    setShowLibraryModal(false);
                }}
            >
                <TouchableOpacity
                    onPressOut={() => {
                        console.log('test');
                        setShowLibraryModal(false);
                    }}
                    style={styles.main_container}
                >
                    <TouchableWithoutFeedback>
                        <View style={styles.content_main_container}>
                            <FlatList data={undefined} renderItem={undefined} />
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        height: '100%',
    },
    content_main_container: {
        height: '50%',
        marginTop: 'auto',
        backgroundColor: WHITE,
    },
});
