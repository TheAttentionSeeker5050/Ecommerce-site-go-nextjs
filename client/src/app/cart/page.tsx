"use client";

import { fetchShoppingCart } from "@/data/redux/api/cartAPIHandlers";
import { reduxStore } from "@/data/redux/reduxStore";
import { useEffect, useState } from "react";

export default function ShoppingCartPage() {

    // use subscribe to get the state of the cart
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // it has to be true at first but I am not fetching from the server yet
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        // if user is signed in, use the fetchShoppingCart thunk to retrieve the shopping cart from the server
        if (reduxStore.getState().sessionIsOpen.value === true) {
            reduxStore.dispatch(fetchShoppingCart());
            setIsLoading(false);
        }

        // subscribe to the shopping cart
        const subscribeShoppingCart = reduxStore.subscribe(() => {
            // get the redux state of the shopping cart and set it to the cart state
            setCart(reduxStore.getState().shoppingCart.value.items);
            setIsLoading(false);
        });
        return () => {
            subscribeShoppingCart();
        }
        
    }, [])


    return (
        <div id="p-content" className="">
            <h1 className="text-center text-center  text-2xl font-bold my-5 ">Your Shopping Cart</h1>

            {isLoading ?
                <div className="text-center">Loading...</div>
            :
                <div className="w-full">
                    {cart.map((item:{productId: string, quantity: number}) => {
                        return (
                            <div className="flex flex-row gap-2 justify-between">
                                {item.productId}
                            </div>
                        )
                    })}
                </div>
            }

        </div>
    )
}