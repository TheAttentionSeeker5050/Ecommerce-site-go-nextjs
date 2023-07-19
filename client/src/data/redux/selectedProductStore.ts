import { createSlice } from "@reduxjs/toolkit";
import { product as dummyProduct } from "../dummyData/productsDummyData";

export const selectedProductSlice = createSlice({
    name: "selectedProductStore",
    initialState: {
        value: dummyProduct,
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.value = action.payload;
        },
        resetSelectedProduct: (state) => {
            state.value = dummyProduct;
        },
    },
});

export const { setSelectedProduct, resetSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;