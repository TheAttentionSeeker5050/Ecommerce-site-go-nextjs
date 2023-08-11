import { createSlice } from "@reduxjs/toolkit";

// this store state can be used for a wide variety of things
// it doesnt really enables to access important user data
// it only eases things such as displaying different headers for authenticated users and such
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
