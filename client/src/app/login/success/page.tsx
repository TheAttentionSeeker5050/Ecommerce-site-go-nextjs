"use client"

import { fetchShoppingCart } from "@/data/redux/api/cartAPIHandlers";
import { reduxStore } from "@/data/redux/reduxStore";
import { setSessionIsOpen } from "@/data/redux/sessionIsOpenStore";
import { handleGetRequests } from "@/functions/handlers/handleGenericRequests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default async function LoginSuccessPage() {

    // redirect to home page if login is successful
    const router = useRouter();

    const [isError, setIsError] = useState(false);

    // send another request to the server to validate the token
    useEffect(() => {
        // make a fetch request to the server to validate the token
        handleGetRequests("/user/account/validate-token")
        .then((data) => {
            // if the token is valid, redirect to home page
            if (data.must_restore_session == true || data.error) {
                // change the state of the redux store session var
                reduxStore.dispatch(setSessionIsOpen(false));

                // set the state of the error
                setIsError(true);
            } else {
                // change the state of the redux store session var
                reduxStore.dispatch(setSessionIsOpen(true));
                // fetch the cart items
                reduxStore.dispatch(fetchShoppingCart());
            }
        })
        .catch((error) => {
            setIsError(true);
        });

        setTimeout(() => {
            if (isError) {
                router.push("/login");
            } else {
                router.push("/");
            }
        }, 1000);
    }, []);



    return (
        <div>

            {/* make a hidden paragraph */}
            <div className='flex flex-col justify-evenly w-screen h-96 bg-background-light  dark:bg-background-dark'>
                <h1 className='text-3xl font-bold text-center text-brand-vivid dark:text-brand-electric'>Redirecting...</h1>
                {/* make the same h2 title but red */}
                
            </div>
        </div>
    )
}