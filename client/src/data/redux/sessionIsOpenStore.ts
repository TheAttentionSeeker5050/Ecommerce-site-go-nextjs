import { createSlice } from "@reduxjs/toolkit";

const sessionIsOpenSlice = createSlice({
    name: "sessionIsOpen",
    initialState: {
        value: false
    },
    reducers: {
        setSessionIsOpen: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setSessionIsOpen } = sessionIsOpenSlice.actions;

export default sessionIsOpenSlice.reducer;
