"use client";

import { getProductsRequest } from "@/api/handlers/handleGetProductsRequests";
import ProductBrowseContainer from "@/components/containers/products-browse/productBrowseContainer";
// import ProductFilterContainer from "@/components/containers/products-browse/productFilterContainer";
import { styleConstants } from "@/styles/constants/styleConstants";
import { getQuerysetFromURL } from "@/utils/routeUtils";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";
import { url } from "inspector";
import { useEffect, useState } from "react";


export default function ProductQuickBrowsePage() {
    


    // get the query params from the url
    const urlSearchParams = new URLSearchParams(getQuerysetFromURL());

    
    // get the url filter params and store them in the redux store
    // getProductFeaturesFromQueryString();

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    const [sortedBy, setSortedBy] = useState(urlSearchParams.get("sorted_by") || "");
    const [sortOrder, setSortOrder] = useState(urlSearchParams.get("sort_order") || "desc");
    const [limit, setLimit] = useState(parseInt(urlSearchParams.get("limit") || "25"));
    const [offset, setOffset] = useState(parseInt(urlSearchParams.get("offset") || "0"));

    // the products state
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


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
                    <ProductBrowseContainer sortedBy={sortedBy} sortOrder={sortOrder} limit={limit} offset={offset} products={products} setSortedBy={setSortedBy} setSortOrder={setSortOrder} setLimit={setLimit} setOffset={setOffset} />
                </div>
            }
            
        </div>
    )
}