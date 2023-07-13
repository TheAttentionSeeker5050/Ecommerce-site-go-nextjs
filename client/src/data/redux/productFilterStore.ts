import { createSlice } from "@reduxjs/toolkit";
import { dummyProductSearchFilters } from "../dummyData/productsDummyData";

// this store will be used to store and retrieve the product filter data
export const productFilterSlice = createSlice({
    name: "productFilterStore",
    initialState: {
        value: dummyProductSearchFilters,
    },
    reducers: {
        setProductFilter: (state, action) => {
            state.value = action.payload;
        },
        resetProductFilter: (state) => {
            state.value = dummyProductSearchFilters;
        },
    },
});

export const { setProductFilter, resetProductFilter } = productFilterSlice.actions;

