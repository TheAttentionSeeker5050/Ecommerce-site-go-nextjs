import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

import productFilterSlice  from "@/data/redux/productFilterStore";
import sessionIsOpenSlice from "@/data/redux/sessionIsOpenStore";
import shoppingCartSlice from "@/data/redux/shoppingCartStore";

// import the thunk middleware
import thunkMiddleware from "redux-thunk";
import { fetchShoppingCart, updateShoppingCart } from "@/data/redux/api/cartAPIHandlers";


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
        shoppingCart: shoppingCartSlice,
    })
);


// the store where all the reducers are combined
export const reduxStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                api: {
                    fetchShoppingCart,
                    updateShoppingCart,
                },
            },
        },
    }),
});

export const persistor = persistStore(reduxStore);




export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

