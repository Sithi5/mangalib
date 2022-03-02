import { Dimensions, StyleSheet } from 'react-native';

export const ORANGE = '#ff7400';
export const WHITE = '#ffffff';
export const RED = '#9f0000';
export const GREY = '#8c8c8c';
export const BLACK = '#000000';
export const BLUE = '#0000FF';
export const LIGHT_GREY = '#e6e6e6';
export const DARK_GREY = '#1e1e1e';
export const DEFAULT_MARGIN = 5;
export const DEFAULT_RADIUS = 10;
export const BACKGROUND_DARK_OPACITY = 'rgba(0,0,0, 0.80)';
export const BACKGROUND_WHITE_OPACITY = 'rgba(255,255,255, 1)';

export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const WINDOW_WIDTH = Dimensions.get('window').width;
export default StyleSheet.create({
    main_container: { flex: 1, backgroundColor: LIGHT_GREY },
    button_search: {
        marginLeft: DEFAULT_MARGIN,
        marginRight: DEFAULT_MARGIN,
    },
});
