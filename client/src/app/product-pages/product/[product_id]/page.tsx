"use client"
import IndividualProductPageContainer from "@/components/containers/selected-product/selectedProductContainer";
import { reduxStore } from "@/data/redux/reduxStore";
import { useEffect } from "react";

export default function IndividualProductPage({params}: { params: {product_id: string} }) {

    function getProductData()  {
        // this function will fetch the product data from the server
        // and return it
        // but for the moment it will only return the redux store data
        return reduxStore.getState().selectedProduct.value;
    }

    const productData = getProductData();

    useEffect(() => {
        // get the product data from the server
        
    }, [])



    return ( 
        <IndividualProductPageContainer product_data={productData} />
    )
}