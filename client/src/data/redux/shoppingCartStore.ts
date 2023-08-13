import { createSlice } from "@reduxjs/toolkit";

// this store state will be used to store the amount of items on the shopping cart
// as well as the reference id and quantity of each item
const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        value: {
            totalItems: 0,
            // declare type of array
            items: [],
            // items will have the following structure: {productId: string, quantity: number}
        }
    },
    reducers: {
        setShoppingCart: (state, action) => {
            state.value.items = action.payload.items;
            state.value.totalItems = action.payload.items.reduce(({total, item}:any) => total + item.quantity, 0);
            
        },
        addItemToShoppingCart: (state: any, action: { payload: {productId:string, quantity:number} }) => {
            
            // check if item is already on the shopping cart
            const itemIndex = state.value.items.findIndex((item: { productId: string; }) => item.productId === action.payload.productId);

            // if item is already on the shopping cart, increase its quantity
            if (itemIndex !== -1) {
                state.value.items[itemIndex].quantity += action.payload.quantity;
            } else {
                // if item is not on the shopping cart, add it
                state.value.items.push(action.payload);
            }
            state.value.totalItems = state.value.items.reduce((total:number, item:{productId:string, quantity:number}) => total + item.quantity, 0);
        },
        removeAllUnitsOfItemFromShoppingCart: (state: any, action: { payload: {productId:string, quantity:number} }) => {
            state.value.items = state.value.items.filter((item: { productId: string; }) => item.productId !== action.payload.productId);
            state.value.totalItems = state.value.items.reduce(({total, item}:any) => total + item.quantity, 0);
        },
        changeQuantityOfItemOnShoppingCart: ({state, action}:any) => {
            state.value.items = state.value.items.map((item: { productId: string; quantity: number; }) => {
                if (item.productId === action.payload.productId) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            });
            state.value.totalItems = state.value.items.reduce(({total, item}:any) => total + item.quantity, 0);
        },
        clearShoppingCart: (state) => {
            state.value = {
                totalItems: 0,
                items: []
            };
        },
    },
});

export const { setShoppingCart, addItemToShoppingCart, removeAllUnitsOfItemFromShoppingCart, changeQuantityOfItemOnShoppingCart, clearShoppingCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;