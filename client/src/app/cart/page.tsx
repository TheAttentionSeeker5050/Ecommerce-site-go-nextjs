"use client";

import { fetchShoppingCart } from "@/data/redux/api/cartAPIHandlers";
import { reduxStore } from "@/data/redux/reduxStore";
import { setShoppingCart } from "@/data/redux/shoppingCartStore";
import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";
import { useEffect, useState } from "react";

export default function ShoppingCartPage() {

    // use subscribe to get the state of the cart
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // it has to be true at first but I am not fetching from the server yet
    const [isError, setIsError] = useState(false);

    

    useEffect(() => {
        handleGetCartItems();
        
    }, []);

    const handleGetCartItems = async () => {
        // fetch directly from the server
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

            // set the cart state
            setCart(data.shoppingCartItems);

            // declare a payload variable of structure {productId: string, quantity: number}
            const payload = data.shoppingCartItems.map((item:any) => ({
                productId: item.productId.toString(),
                quantity: item.quantity,
            }));
            
            reduxStore.dispatch(setShoppingCart(payload));

            // set the loading state
            setIsLoading(false);
           
        } catch (error) {
            console.log(error);
            setIsError(true);
        }
    }


    return (
        <div id="p-content" className="">
            <h1 className="text-center text-center  text-2xl font-bold my-5 ">Your Shopping Cart</h1>

            {isLoading ?
                <div className="text-center text-lg">Loading...</div>
            :
                isError ?
                    <div className="text-center text-lg">Error...</div>
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

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
