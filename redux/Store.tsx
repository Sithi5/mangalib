import { configureStore } from '@reduxjs/toolkit';
import LibraryReducer from './LibrarySlice';
import UserReducer from './UserSlice';

export const store = configureStore({
    reducer: {
        Library: LibraryReducer,
        User: UserReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
