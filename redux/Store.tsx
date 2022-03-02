import { configureStore } from '@reduxjs/toolkit';
import NavigationsHeaderOptionReducer from './NavigationsHeaderOptionSlice';
import UserReducer from './UserSlice';

export const store = configureStore({
    reducer: {
        user: UserReducer,
        navigation_header_option: NavigationsHeaderOptionReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
