// here we will create a fetch cart items api handler for our thunk middleware
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/data/redux/reduxStore";
import { setShoppingCart } from "../shoppingCartStore";
import { reduxStore } from "../reduxStore";
import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";

export const fetchShoppingCart = createAsyncThunk("shoppingCart/fetchShoppingCart", async (_, { dispatch }) => {
   try {
        // get the url of the api endpoint
        const url = getServerRequestURL("/cart");

        // get the cors origin
        const corsOrigin = getCorsOrigin();

        const response = await fetch(url,{
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': corsOrigin,
            },
        }); // Replace with your API endpoint

        if (!response.ok) {
            return;
        }
        const data = await response.json();


        // declare a payload variable of structure {productId: string, quantity: number}
        let payload: [{productId: string, quantity: number}] = [{productId: "", quantity: 0}];

        // prepare the payload as a list of items
        data.shoppingCartItems.forEach((item: any) => {
            payload.push({
                productId: item.productId,
                quantity: item.quantity,
            });
        });

        // if the state items array not empty, delete the initial empty item
        if (payload.length > 1) {
            payload.shift();
        }

        dispatch(setShoppingCart({ items: payload }));
    } catch (error) {
        console.error("Error fetching shopping cart:", error);
    }
});

// Create an async thunk to update the shopping cart data on the server
export const updateShoppingCart = createAsyncThunk(
    "shoppingCart/updateShoppingCart",
    async (_, { getState, dispatch }) => {
      try {
        // get the url of the api endpoint
        const url = getServerRequestURL("/cart");

        // get the cors origin
        const corsOrigin = getCorsOrigin();
        
        const state = getState() as RootState;


        // prepare the payload for the request
        // the api server accepts the following structure for the request body:
        // [{product_id: string, quantity: number}]
        let payload: [{product_id: number, quantity: number}] = [{product_id: 0, quantity: 0}];
        state.shoppingCart.value.items.forEach((item: { productId: string; quantity: number; }) => {
            payload.push({
                product_id: parseInt(item.productId),
                quantity: item.quantity,
            });
        });

        console.log("payload", payload);

        // if the state items array not empty, delete the initial empty item
        if (payload.length > 1) {
            payload.shift();
        }

        console.log("payload", payload);

        const response = await fetch(url, {
          method: "POST",
          // mode: "no-cors",
          mode: "cors",
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': corsOrigin,
          },
          body: JSON.stringify(payload),
        });


        if (!response.ok) {
          console.error("Error updating shopping cart on server");
        }
      } catch (error) {
        console.error("Error updating shopping cart:", error);
      }
    }
  );