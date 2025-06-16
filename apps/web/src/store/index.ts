import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from './auth/authApi';
import { profileApi } from './profile/profile.api';

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
            },
        }).concat(authApi.middleware, profileApi.middleware),
});
