"use client";
import { handleGetRequests } from "@/api/handlers/handleGenericGetRequests";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import { useEffect, useState } from "react";


export default function ProductCategoriesPage() {

    // declare state variables
    const [productCategories, setProductCategories] = useState([]);
    
    
    useEffect(() => {
        // get the data for the product categories
        handleGetRequests("/products/category")
        .then((data) => {
            // change the state of the product categories
            setProductCategories(data.productCategoryList);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        // the categories browse container with the state arrays
        <CategoriesBrowseContainer title={"Browse Products by Category"} productCategories={productCategories} />
    )
}