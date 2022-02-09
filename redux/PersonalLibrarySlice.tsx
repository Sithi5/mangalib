import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../globals/GlobalTypes';

type PersonalLibraryState = {
    list: Id[];
};

const initialState: PersonalLibraryState = {
    list: [],
};

export const personalLibrarySlice = createSlice({
    name: 'personalLibrary',
    initialState,
    reducers: {
        updatePersonalLibrary: (state, action: PayloadAction<string>) => {
            if (state.list.includes(action.payload)) {
                let index = state.list.indexOf(action.payload);
                if (index > -1) {
                    state.list.splice(index, 1);
                }
            } else {
                state.list.push(action.payload);
            }
        },
        addToPersonalLibrary: (state, action: PayloadAction<string>) => {
            if (!state.list.includes(action.payload)) {
                state.list.push(action.payload);
            }
        },
        removeInPersonalLibrary: (state, action: PayloadAction<string>) => {
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
