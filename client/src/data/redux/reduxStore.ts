import { configureStore } from "@reduxjs/toolkit";
import { productFilterSlice } from "./productFilterStore";

// the store where all the reducers are combined
export const reduxStore = configureStore({
    reducer: {
        // add reducers here
        productFilterStoreReducer: productFilterSlice.reducer,
    },
});