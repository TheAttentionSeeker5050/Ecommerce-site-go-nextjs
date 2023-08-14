"use client";

import { ButtonWithActionPrimary } from "@/components/buttons/buttonPrimary";
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

    const handleGetCartItemQuantity = async (
        event: React.ChangeEvent<HTMLInputElement>,
        productId: string,
    ) => {
        // edit the quantity of the item in the cart local state
        const newCart = cart.map((item:any) => {
            // attempt to parse the value as an integer number
            const intQuantity = parseInt(event.target.value);

            // if the value is not a number, return the item
            if (isNaN(intQuantity)) {
                return item;
            }else {

                if (item.productId == productId) {
                    return {
                        ...item,
                        quantity: intQuantity
                    };
                } else {
                    return item;
                } 
            }
            });
            
        

        // set the cart state
        setCart(newCart as any);
        
    }

    return (
        <div id="p-content" className="">
            <h1 className="text-center text-center  text-2xl font-bold my-6 ">Your Shopping Cart</h1>

            {isLoading ?
                <div className="text-center text-lg">Loading...</div>
            :
                isError ?
                    <div className="text-center text-lg">Error...</div>
                :
                    <div className="max-w-lg flex p-4 gap-4 flex-col mx-auto border-brand-vivid border-t-2">
                        {cart.map((item:any) => {
                            return (
                                <div className="grid grid-rows-3 gap-2 grid-cols-6 m-2 border-brand-vivid border-b-2"  key={item.productId}>
                                    <p className="text-md font-bold col-start-1 col-span-4 row-start-1 row-span-1 ">
                                        {item.productName}
                                    </p>
                                    <p className="text-sm col-start-1 col-span-2 row-start-2 row-span-1">
                                        Item Id: {item.productId}
                                    </p>
                                    <p className="text-xl text-brand-vivid text-right col-start-6 col-span-2 row-start-1 row-span-1">
                                        ${item.productPrice}
                                    </p>
                                    <p className="text-md text-right col-start-5 col-span-3 row-start-2 row-span-2 flex flex-row gap-3 justify-end">
                                        Quantity: 
                                        {/* add an input box here */}
                                        <input className="w-16 h-6 border-2 border-black rounded-lg p-3" type="number" value={item.quantity} onChange={(event) => handleGetCartItemQuantity(event, item.productId)}/>
                                    </p>
                                </div>
                            )
                        })}

                        <ButtonWithActionPrimary
                            text="Update Cart"
                            onClick={() => {
                                // fetch the cart items
                                alert("Made Purchase");
                            }}
                        />
                    </div>

            }

        </div>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
