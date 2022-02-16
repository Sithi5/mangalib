import { StyleSheet } from 'react-native';

export const ORANGE = '#ff7400';
export const WHITE = '#ffffff';
export const GREY = '#8c8c8c';
export const BLACK = '#000000';
export const LIGHTGREY = '#e6e6e6';
export const DEFAULT_MARGIN = 5;
export const DEFAULT_RADIUS = 10;

export default StyleSheet.create({
    main_container: { flex: 1, backgroundColor: LIGHTGREY },
    button_search: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
    },
});
