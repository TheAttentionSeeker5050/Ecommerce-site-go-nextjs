"use client"

import { reduxStore } from "@/data/redux/reduxStore";
import { setSessionIsOpen } from "@/data/redux/sessionIsOpenStore";
import { handleGetRequests } from "@/functions/handlers/handleGenericGetRequests";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export default async function LoginSuccessPage() {

    // redirect to home page if login is successful
    const router = useRouter();

    const [isError, setIsError] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    // send another request to the server to validate the token
    useEffect(() => {
        // make a fetch request to the server to validate the token
        handleGetRequests("/user/account/validate-token")
        .then((data) => {
            // if the token is valid, redirect to home page
            if (data.must_restore_session == true) {
                // change the state of the redux store session var
                reduxStore.dispatch(setSessionIsOpen(false));

                // set the state of the error
                setIsError(true);
            } else {
                // change the state of the redux store session var
                reduxStore.dispatch(setSessionIsOpen(true));
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
        }, 2000);

        setShouldRefresh(!shouldRefresh);
    }, []);



    return (
        <div>

            {/* make a hidden paragraph */}
            <p className='hidden'>{shouldRefresh}</p>
            <div className='flex flex-col justify-evenly w-screen h-96 bg-background-light  dark:bg-background-dark'>
                <h1 className='text-3xl font-bold text-center text-brand-vivid dark:text-brand-electric'>Redirecting...</h1>
                {/* make the same h2 title but red */}
                
            </div>
        </div>
    )
}