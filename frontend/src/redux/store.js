import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import authadminSlice from "./authadminSlice";
import jobSlice from "./jobSlice";
import servicesSlice from "./servicesSlice";
import applicationSlice from "./applicationSlice";
import {
    // persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice,
    authadmin: authadminSlice,
    job: jobSlice,
    service: servicesSlice,
    application: applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;