"use client";

import { getProductsRequest } from "@/api/handlers/handleGetProductsRequests";
import ProductBrowseContainer from "@/components/containers/products-browse/productBrowseContainer";
import ProductFilterContainer from "@/components/containers/products-browse/productFilterContainer";
import { styleConstants } from "@/styles/constants/styleConstants";
import { getQuerysetFromURL } from "@/utils/routeUtils";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";
import { url } from "inspector";
import { useEffect, useState } from "react";


export default function ProductQuickBrowsePage() {
    


    // get the query params from the url
    const urlSearchParams = new URLSearchParams(getQuerysetFromURL());

    
    // get the url filter params and store them in the redux store
    getProductFeaturesFromQueryString();

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    // i am using variables and the url search params object because i want to be able to change the sorting and pagination state without reloading the page and not dealing with async execution
    // i may change to somethign else later
    let sortedBy = urlSearchParams.get("sorted_by") || "";
    let sortOrder = urlSearchParams.get("sort_order") || "desc";
    let limit = parseInt(urlSearchParams.get("limit") || "25");
    let offset = parseInt(urlSearchParams.get("offset") || "0");

    // will fix this next
    let pagination = parseInt(urlSearchParams.get("pagination") || "0");
    let ascending = sortOrder === "asc" ? true : false;

    // the products state
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    // we will use useEffect to fetch the products from the server
    useEffect(() => {

        // get the products from the server
        getProductsRequest({
            sortedBy: sortedBy,
            sortOrder: sortOrder,
            limit: limit,
            offset: offset,
        }).then((data) => {
            // set the products state
            setProducts(data);
            setIsLoading(false);
        }
        ).catch((error) => {
            console.log(error);
        }
        );
    }, []);
    
    return (
        <div id="p-content" className="w-full">
            <h1 className={styleConstants.pageTitleStyle}>Browse our Products</h1>

            {isLoading ? 
                <div className="text-center">Loading...</div>
                :
                <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                    {/* <ProductFilterContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} /> */}
                    <ProductBrowseContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} products={products} />
                </div>
            }
            
        </div>
    )
}