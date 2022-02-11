import { StyleSheet } from 'react-native';

export const ORANGE = '#ff7400';
export const WHITE = '#ffffff';
export const GREY = '#8c8c8c';
export const LIGHTGREY = '#e6e6e6';
export const DEFAULT_MARGIN = 5;

export default StyleSheet.create({
    main_container: { flex: 1, backgroundColor: WHITE },
    text_input: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
        height: 50,
        borderColor: WHITE,
        borderWidth: 1,
        paddingLeft: DEFAULT_MARGIN,
    },
    button_search: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
    },
});
