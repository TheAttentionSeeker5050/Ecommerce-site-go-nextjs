'use client'


import ProductHighlightedContainer from "@/components/containers/main-page/productHighlightedContainer"
import TrendingProductsContainer from "@/components/containers/main-page/trendingProductsContainer"
import { reduxStore } from "@/data/redux/reduxStore";
import { useEffect } from "react";

export default function Page() {

    useEffect(() => {
        // get the cart value from the store
        console.log(reduxStore.getState().shoppingCart.value.items);
        console.log(reduxStore.getState().shoppingCart.value.totalItems);
        
    }, []);
    return (
        <div id="p-content" className="">
            <h1 className="text-4xl font-bold text-center py-3">Browse Our Products</h1>
            
            <ProductHighlightedContainer />
            <TrendingProductsContainer containerTitle="Trending Products" />
    
        </div>
    )
}