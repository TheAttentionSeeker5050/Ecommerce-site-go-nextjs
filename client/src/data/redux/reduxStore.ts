import { configureStore } from "@reduxjs/toolkit";
import productFilterSlice  from "./productFilterStore";
// import productSlice  from "./productStore";
// import selectedProductSlice  from "./selectedProductStore"; 

// the store where all the reducers are combined
export const reduxStore = configureStore({
    reducer: {
        // add reducers here
        productFilter: productFilterSlice,
    },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;