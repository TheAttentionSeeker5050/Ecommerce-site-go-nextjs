'use client'


import ProductHighlightedContainer from "@/components/containers/main-page/productHighlightedContainer"
import TrendingProductsContainer from "@/components/containers/main-page/trendingProductsContainer"

export default function Page() {

    return (
        <div id="p-content" className="">
            <h1 className="text-4xl font-bold text-center py-3">Browse Our Products</h1>
            
            <ProductHighlightedContainer />
            <TrendingProductsContainer containerTitle="Trending Products" />
    
        </div>
    )
}