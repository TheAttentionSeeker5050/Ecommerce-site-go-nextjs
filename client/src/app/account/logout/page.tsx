"use client"
import { reduxStore } from "@/data/redux/reduxStore";
import { setSessionIsOpen } from "@/data/redux/sessionIsOpenStore";
import { handlePostRequests } from "@/functions/handlers/handleGenericRequests";
import { deleteCookie } from "cookies-next";
// import router from "next/router";
import { useRouter } from "next/navigation";

import { useEffect } from "react"

export default function LogoutPage({params}: {params: { edit_section: string } }) {

    const router = useRouter();

    useEffect(() => {
        // get the edit_section from the params
        reduxStore.dispatch(setSessionIsOpen(false));

        // delete the cookies a request to the server
        handlePostRequests("/user/logout", {})

        // redirect to home page
        router.push("/login");

    }, []);

    return <h1>Hello, Next.js! edit by section page, editing the {params.edit_section} </h1>
}