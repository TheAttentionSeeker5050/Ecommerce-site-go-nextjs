import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productFilterSlice  from "./productFilterStore";
import sessionIsOpenSlice from "./sessionIsOpenStore";


const persistConfig = {
    key: "reduxPersistStore",
    storage,
    whitelist: ["sessionIsOpen"],
};

const persistedReducer = persistReducer(persistConfig, 
    combineReducers({
        // add reducers here
        productFilter: productFilterSlice,
        sessionIsOpen: sessionIsOpenSlice,
    })
);


// the store where all the reducers are combined
export const reduxStore = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(reduxStore);




export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

