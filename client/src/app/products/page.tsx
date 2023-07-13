"use client";

import ProductBrowseContainer from "@/components/containers/productBrowseContainer";
import ProductFilterContainer from "@/components/containers/productFilterContainer";
import { setProductFilter } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";
import { styleConstants } from "@/styles/constants/styleConstants";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";


export default function ProductQuickBrowsePage() {
    
    // get the query params from the url
    const urlSearchParams = new URLSearchParams(window.location.search);
    
    // get the url filter params and store them in the redux store
    getProductFeaturesFromQueryString();

    
    

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    // i am using variables and the url search params object because i want to be able to change the sorting and pagination state without reloading the page and not dealing with async execution
    // i may change to somethign else later
    let sortedBy = urlSearchParams.get("sort") || "popularity";
    let ascending = urlSearchParams.get("ascending") === "true" || false;
    let pagination = parseInt(urlSearchParams.get("page") || "1");
    
    
    return (
        <div id="p-content" className="w-full">
            <h1 className={styleConstants.pageTitleStyle}>Browse our Products</h1>
            <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                <ProductFilterContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} />
                <ProductBrowseContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} />
            </div>
            
        </div>
    )
}