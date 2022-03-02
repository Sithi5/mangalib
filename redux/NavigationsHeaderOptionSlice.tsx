import { createSlice } from '@reduxjs/toolkit';

export type NavigationHeaderState = {
    search_top_tab_header_shown: boolean;
};

const initialState: NavigationHeaderState = {
    search_top_tab_header_shown: true,
};

export const navigationsHeaderOptionSlice = createSlice({
    name: 'navigation_header',
    initialState,
    reducers: {
        showSearchTobTabHeader(state) {
            state.search_top_tab_header_shown = true;
        },
        hideSearchTobTabHeader(state) {
            state.search_top_tab_header_shown = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { showSearchTobTabHeader, hideSearchTobTabHeader } =
    navigationsHeaderOptionSlice.actions;

export default navigationsHeaderOptionSlice.reducer;
