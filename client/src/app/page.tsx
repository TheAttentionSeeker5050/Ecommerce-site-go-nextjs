'use client'

import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary"



export default function Page() {

    return (
        <div id="p-content" className="">
            <h1 >hello home page</h1>
            <br />
            <br />

            {/* create redirect buttons to login and register */}
            <ButtonRedirectPrimary text="Login" href="/login" />
            <ButtonRedirectPrimary text="Register" href="/register" />
    
        </div>
    )
}