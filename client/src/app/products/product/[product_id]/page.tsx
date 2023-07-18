import IndividualProductPageContainer from "@/components/containers/selected-product/selectedProductContainer";

export default function IndividualProductPage({params}: { params: {product_id: string} }) {
    return ( 
        <div id="p-content" className="w-full">
            <IndividualProductPageContainer product_id={params.product_id} />
        </div>
    )
}