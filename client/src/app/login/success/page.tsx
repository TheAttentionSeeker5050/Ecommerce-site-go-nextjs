"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";




export default async function LoginSuccessPage() {

    // redirect to home page if login is successful
    const router = useRouter();

    // redirect to home page, it should require some server validation first
    // will be implemented later
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }, []);

    return (
        <div>
            <div className='flex flex-col justify-evenly w-screen h-96 bg-background-light  dark:bg-background-dark'>
                <h1 className='text-3xl font-bold text-center text-brand-vivid dark:text-brand-electric'>Login was successful</h1>
                <p className='text-lg font-bold text-center text-gray-700 dark:text-white'>The page will redirect to home</p>
            </div>
        </div>
    )
}