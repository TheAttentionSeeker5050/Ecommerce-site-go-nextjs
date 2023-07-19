'use client'

import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary"
import { ButtonRedirectSecondary } from "@/components/buttons/buttonSecondary"
import ProductHighlightedContainer from "@/components/containers/main-page/productHighlightedContainer"
import TrendingProductsContainer from "@/components/containers/main-page/trendingProductsContainer"


export default function Page() {

    


    return (
        <div id="p-content" className="">
            <h1></h1>
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