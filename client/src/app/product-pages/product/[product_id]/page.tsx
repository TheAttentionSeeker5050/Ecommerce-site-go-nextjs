"use client"
import { getProductByIdRequest } from "@/functions/handlers/handleGetProductsRequests";
import IndividualProductPageContainer from "@/components/containers/selected-product/selectedProductContainer";
import { reduxStore } from "@/data/redux/reduxStore";
import { useEffect, useState } from "react";

export default function IndividualProductPage({params}: { params: {product_id: string} }) {


    // the state variable for the product data
    const [productData, setProductData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()  => {
        // get the product data from the server

        // convert the product_id to an integer
        const product_id_int = parseInt(params.product_id);

        // using our getProductByIdRequest handlers
        getProductByIdRequest({productId: product_id_int})
        .then((data) => {
            if (data.error) {
                setIsError(true);
                setIsLoading(false);
            } else {
                // set the product data state
                setProductData(data);
                setIsLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setIsError(true);
            setIsLoading(false);
        });
    }, [])
    
    return ( 
        <div>
            {isLoading ? 
                <div className="text-center text-xl">Loading...</div> 
                : isError ?
                    <div className=" max-w-xl mx-auto my-8 text-white  " role="alert" 
                    // hidden
                    >
                        <p className="text-center text-xl bg-danger rounded-lg p-2 mx-3">Something went wrong! Could not fetch from the server 😭 </p>
                    </div>
                    :
                    <IndividualProductPageContainer product_data={productData} />
            }
        </div>
    )
}