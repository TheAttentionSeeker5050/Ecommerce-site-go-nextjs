"use client"

import ProductBrowseContainer from "@/components/containers/productBrowseContainer"
import ProductFilterContainer from "@/components/containers/productFilterContainer"
import { styleConstants } from "@/styles/constants/styleConstants"
export default function ProductQuickBrowsePage() {
    

    
    return (
        <div id="p-content" className="w-full">
            <h1 className={styleConstants.pageTitleStyle}>Browse our Products</h1>
            <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                <ProductFilterContainer />
                <ProductBrowseContainer />
            </div>
            
        </div>
    )
}