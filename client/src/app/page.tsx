'use client'

import {cookies} from 'next/headers'
import ProductHighlightedContainer from "@/components/containers/main-page/productHighlightedContainer"
import TrendingProductsContainer from "@/components/containers/main-page/trendingProductsContainer"


export default function Page() {

    
    

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