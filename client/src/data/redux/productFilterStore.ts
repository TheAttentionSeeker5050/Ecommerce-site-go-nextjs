import { createSlice } from "@reduxjs/toolkit";
import { dummyProductSearchFilters } from "../dummyData/productsDummyData";
import { RootState } from "./reduxStore";

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
        changePriceMin: (state, action) => {
            state.value.price.min = action.payload;
        },
        changePriceMax: (state, action) => {
            state.value.price.max = action.payload;
        },
        changeMinRating: (state, action) => {
            state.value.minRating = action.payload;
        },
        changeProductFeatureSelected: (state, action) => {
            state.value.features[action.payload.featureIndex].options[action.payload.optionIndex].selected = !state.value.features[action.payload.featureIndex].options[action.payload.optionIndex].selected;
        },
    },
});

export const { setProductFilter, resetProductFilter, changePriceMin, changePriceMax, changeMinRating, changeProductFeatureSelected } = productFilterSlice.actions;

export default productFilterSlice.reducer;