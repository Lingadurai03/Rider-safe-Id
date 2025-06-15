import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from './auth/authApi';

const reducers = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [],
            },
        }).concat(authApi.middleware),
});
