"use client"
import IndividualProductPageContainer from "@/components/containers/selected-product/selectedProductContainer";
import { reduxStore } from "@/data/redux/reduxStore";

export default function IndividualProductPage({params}: { params: {product_id: string} }) {

    function getProductData()  {
        // this function will fetch the product data from the server
        // and return it
        // but for the moment it will only return the redux store data
        return reduxStore.getState().selectedProduct.value;
    }

    const productData = getProductData();

    return ( 
        <div id="p-content" className="w-full">
            <IndividualProductPageContainer product_data={productData} />
        </div>
    )
}