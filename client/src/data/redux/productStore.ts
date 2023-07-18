import { createSlice } from "@reduxjs/toolkit";
import { productsArray as dummyProductsArray } from "../dummyData/productsDummyData";
import exp from "constants";

export const productSlice = createSlice({
    name: "productStore",
    initialState: {
        value: dummyProductsArray,
    },
    reducers: {
        setProducts: (state, action) => {
            state.value = action.payload;
        },
        resetProducts: (state) => {
            state.value = dummyProductsArray;
        },
    },
});

// make an export all actions expression
export const { setProducts, resetProducts } = productSlice.actions;

// export the reducer
export default productSlice.reducer;
        