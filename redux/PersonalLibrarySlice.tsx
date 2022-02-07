import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PersonalLibraryState = {
    list: { [name: string]: MangaData };
};

const initialState: PersonalLibraryState = {
    list: [],
};

export const personalLibrarySlice = createSlice({
    name: 'personalLibrary',
    initialState,
    reducers: {
        updatePersonalLibrary: (state, action: PayloadAction<String>) => {
            if (state.list.includes(action.payload)) {
                let index = state.list.indexOf(action.payload);
                if (index > -1) {
                    state.list.splice(index, 1);
                }
            } else {
                state.list.push(action.payload);
            }
        },
        addToPersonalLibrary: (state, action: PayloadAction<String>) => {
            if (!state.list.includes(action.payload)) {
                state.list.push(action.payload);
            }
        },
        removeInPersonalLibrary: (state, action: PayloadAction<String>) => {
            let index = state.list.indexOf(action.payload);
            if (index > -1) {
                state.list.splice(index, 1);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addToPersonalLibrary,
    removeInPersonalLibrary,
    updatePersonalLibrary,
} = personalLibrarySlice.actions;

export default personalLibrarySlice.reducer;
