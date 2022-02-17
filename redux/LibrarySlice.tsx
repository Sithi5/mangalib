import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../globals/GlobalTypes';

type LibraryState = {
    list: Id[];
};

const initialState: LibraryState = {
    list: [],
};

export const LibrarySlice = createSlice({
    name: 'Library',
    initialState,
    reducers: {
        updateLibrary: (state, action: PayloadAction<string>) => {
            if (state.list.includes(action.payload)) {
                let index = state.list.indexOf(action.payload);
                if (index > -1) {
                    state.list.splice(index, 1);
                }
            } else {
                state.list.push(action.payload);
            }
        },
        addToLibrary: (state, action: PayloadAction<string>) => {
            if (!state.list.includes(action.payload)) {
                state.list.push(action.payload);
            }
        },
        removeFromLibrary: (state, action: PayloadAction<string>) => {
            let index = state.list.indexOf(action.payload);
            if (index > -1) {
                state.list.splice(index, 1);
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToLibrary, removeFromLibrary, updateLibrary } =
    LibrarySlice.actions;

export default LibrarySlice.reducer;
