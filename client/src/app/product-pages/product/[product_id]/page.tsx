"use client"
import { getProductByIdRequest } from "@/api/handlers/handleGetProductsRequests";
import IndividualProductPageContainer from "@/components/containers/selected-product/selectedProductContainer";
import { reduxStore } from "@/data/redux/reduxStore";
import { useEffect, useState } from "react";

export default function IndividualProductPage({params}: { params: {product_id: string} }) {


    // the state variable for the product data
    const [productData, setProductData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()  => {
        // get the product data from the server

        // convert the product_id to an integer
        const product_id_int = parseInt(params.product_id);

        // using our getProductByIdRequest handlers
        getProductByIdRequest({productId: product_id_int})
        .then((data) => {
            // set the product data state
            setProductData(data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])
    


    return ( 
        <div>
            {isLoading ? 
                <div>Loading...</div> : 
                
                <IndividualProductPageContainer product_data={productData} />
            }
        </div>
    )
}