"use client";
import { handleGetRequests } from "@/api/handlers/handleGenericGetRequests";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import { useEffect, useState } from "react";


export default function ProductPetTypesPage() {

    // declare state variables
    const [productCategories, setProductCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        // get the data for the animal categories
        handleGetRequests("/products/categories/pet-types").then((data) => {
            // change the state of the product categories
            setProductCategories(data.petTypeList);
            setIsLoading(false);
        })
    }, [])

    

    return (
        <div id="p-content" className="w-full">
            { 
            isLoading 
                ?
                    <div className="text-center">Loading...</div>
                :
                    // the categories browse container with the state arrays
                    <CategoriesBrowseContainer title={"Browse Products by Pet Type"} productCategories={productCategories} />
            }
        </div>
    )
}