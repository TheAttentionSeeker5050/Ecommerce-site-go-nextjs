"use client";
import { handleGetRequests } from "@/api/handlers/handleGenericGetRequests";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import { useEffect, useState } from "react";


export default function ProductCategoriesPage() {

    // declare state variables
    const [productCategories, setProductCategories] = useState([]);
    const [animalCategories, setAnimalCategories] = useState([]);
    
    
    useEffect(() => {
        // get the data for the product categories
        // getData("/products/category")
        handleGetRequests("/products/category")
        .then((data) => {
            // change the state of the product categories
            setProductCategories(data.productCategoryList);
        })

        // get the data for the animal categories
        handleGetRequests("/products/category/pet-types").then((data) => {
            // change the state of the product categories
            setAnimalCategories(data.petTypeList);
        })
    }, [])

    return (
        // the categories browse container with the state arrays
        <CategoriesBrowseContainer productCategories={productCategories} animalCategories={animalCategories} />
    )
}