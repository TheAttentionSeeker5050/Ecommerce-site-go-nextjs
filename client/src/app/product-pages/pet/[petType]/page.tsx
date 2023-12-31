
"use client";
import { getProductsRequest } from "@/functions/handlers/handleGetProductsRequests";
// import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import ProductBrowseContainer from "@/components/containers/products-browse/productBrowseContainer";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { getQuerysetFromURL } from "@/utils/routeUtils";

export default function ProductBrowseListingByPetTypePage({params}: { params: {petType: string} }) {
    // get the query params from the url
    const urlSearchParams = new URLSearchParams(getQuerysetFromURL());
    

    // get the url filter params and store them in the redux store
    // getProductFeaturesFromQueryString();

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    // i am using variables and the url search params object because i want to be able to change the sorting and pagination state without reloading the page and not dealing with async execution
    // i may change to somethign else later
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
            petType: params.petType,
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
            <h1 className="text-2xl font-bold text-center">{"Browse products: "+params.petType}</h1>
            {
            isLoading ?
                <div className="text-center">Loading...</div>
                : isError === true ?
                <div className="text-center">Something went wrong...</div>
                :
                <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                    
                    <ProductBrowseContainer sortedBy={sortedBy} sortOrder={sortOrder} limit={limit} offset={offset} products={products} setSortedBy={setSortedBy} setSortOrder={setSortOrder} setLimit={setLimit} setOffset={setOffset} router={router} />
                </div>
        }
        </div>
    )
}