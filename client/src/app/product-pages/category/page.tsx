"use client";
import { handleGetRequests } from "@/functions/handlers/handleGenericRequests";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import { useEffect, useState } from "react";


export default function ProductCategoriesPage() {

    // declare state variables
    const [productCategories, setProductCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    
    
    useEffect(() => {
        // get the data for the product categories
        handleGetRequests("/products/categories/product-types")
        .then((data) => {
            if (data.error) {
                setIsError(true);
            } else {
                // change the state of the product categories
                setProductCategories(data.productCategoryList);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            setIsError(true);
        })
    }, [])

    return (
        // the categories browse container with the state arrays
        <div id="p-content" className="w-full">
            {isLoading ?
                <div className="text-center">Loading...</div>
            :
            isError === true ?
                <div className="text-center">Something went wrong! Could not fetch from the server 😭 </div> 
            :
                <CategoriesBrowseContainer displayType={"Category"} productCategories={productCategories} />
            }

        </div>
    )
}