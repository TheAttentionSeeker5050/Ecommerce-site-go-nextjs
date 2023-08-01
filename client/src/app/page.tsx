'use client'


import ProductHighlightedContainer from "@/components/containers/main-page/productHighlightedContainer"
import TrendingProductsContainer from "@/components/containers/main-page/trendingProductsContainer"
import {setCookie, getCookie, getCookies } from "cookies-next"
import { useEffect } from "react"

export default function Page() {

    useEffect(() => {

        // console.log("isLoggedIn: ", getCookie("logged_in"))
        console.log("all cookies: ", getCookies())

    }, [])

    return (
        <div id="p-content" className="">
            <h1 className="text-4xl font-bold text-center py-3">Browse Our Products</h1>
            
            <ProductHighlightedContainer />
            <TrendingProductsContainer containerTitle="Trending Products" />
            {/* container for the trending products */}
            
            {/* <h1 >hello home page</h1>
            <br />
            <br />

            <ButtonRedirectPrimary text="Login" href="/login" />
            <ButtonRedirectPrimary text="Register" href="/register" /> */}

            

    
        </div>
    )
}