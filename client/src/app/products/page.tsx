"use client"

import ProductBrowseContainer from "@/components/containers/productBrowseContainer"
import { styleConstants } from "@/styles/constants/styleConstants"
export default function ProductQuickBrowsePage() {
    

    
    return (
        <div id="p-content" className="w-full">
            <h1 className={styleConstants.pageTitleStyle}>Browse our Products</h1>
            <ProductBrowseContainer />
            
        </div>
    )
}