"use client";
import { handleGetRequests } from "@/functions/handlers/handleGenericRequests";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import { useEffect, useState } from "react";


export default function ProductPetTypesPage() {

    // declare state variables
    const [productCategories, setProductCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        // get the data for the animal categories
        handleGetRequests("/products/categories/pet-types")
        .then((data) => {
            // change the state of the product categories
            setProductCategories(data.petTypeList);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsError(true);
        })
    }, [])

    

    return (
        <div id="p-content" className="w-full">
            { 
            isLoading 
                ?
                    <div className="text-center">Loading...</div>
                :
                isError === true ?
                    <div className="text-center">Something went wrong! Could not fetch from the server 😭 </div> 
                :
                    // the categories browse container with the state arrays
                    <CategoriesBrowseContainer displayType={"Pet Type"} productCategories={productCategories} />
            }
        </div>
    )
}