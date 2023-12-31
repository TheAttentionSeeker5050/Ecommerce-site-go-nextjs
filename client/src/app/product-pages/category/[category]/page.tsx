"use client";
import { getProductsRequest } from "@/functions/handlers/handleGetProductsRequests";
// import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import ProductBrowseContainer from "@/components/containers/products-browse/productBrowseContainer";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function ProductBrowseListingByCategoryPage({params}: { params: {category: string} }) {
    // get the query params from the url
    const urlSearchParams = new URLSearchParams(window.location.search);
    

    // get the url filter params and store them in the redux store
    // getProductFeaturesFromQueryString();

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    const [sortedBy, setSortedBy] = useState(urlSearchParams.get("sorted_by") || "");
    const [sortOrder, setSortOrder] = useState(urlSearchParams.get("sort_order") || "desc");
    const [limit, setLimit] = useState(parseInt(urlSearchParams.get("limit") || "25"));
    const [offset, setOffset] = useState(parseInt(urlSearchParams.get("offset") || "0"));

    // name state variables 
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // declare the router
    const router = useRouter();


    // get the products from the server before render
    useEffect(() => {
        // get the products from the server
        getProductsRequest({
            category: params.category,
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
            setIsError(true);
        });
        
    }, [sortedBy, sortOrder, limit, offset]);
    
    return (
        <div id="p-content" className="w-full">
            <h1 className="text-2xl font-bold text-center">{"Browse products: "+params.category}</h1>
            {
            isLoading ?
                <div className="text-center">Loading...</div>
                :
            <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                
                {isError === true ? 
                    <div className="text-center">Something went wrong! Could not fetch from the server 😭 </div> 
                : 
                    <ProductBrowseContainer sortedBy={sortedBy} sortOrder={sortOrder} limit={limit} offset={offset} products={products} setSortedBy={setSortedBy} setSortOrder={setSortOrder} setLimit={setLimit} setOffset={setOffset} router={router} />
                }
            </div>

        }
        </div>
    )
}