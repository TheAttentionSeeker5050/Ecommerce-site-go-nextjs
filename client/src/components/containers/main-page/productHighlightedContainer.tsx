import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary";
import { product as productData } from "@/data/dummyData/productsDummyData";
import Image from "next/image";


export default function ProductHighlightedContainer(
    
) {

    return (
        <div className="flex flex-row flex-wrap w-full justify-around gap-3.5 p-4 bg-pink-300 dark:bg-secondary-dark">
            
            <div className="">
                <Image width={288} height={288} alt="Main product highlight" className="w-72 rounded-md" src={
                    productData.productImageSrc
                } />
            </div>

            <div className="max-w-sm w-full">
                <h2 className="text-2xl font-bold">
                    {productData.productHighlight}
                </h2>
                <p className="text-lg">
                    {productData.productName}
                </p>
                
                <p className="text-md truncate whitespace-nowrap overflow-hidden">
                    {productData.productDescription}
                </p>
                <p className="text-md font-bold">
                    ${productData.price}
                </p>
                <div className="my-4 text-center">
                    <ButtonRedirectPrimary text="View Product" href="/product" />
                </div>
            </div>

        </div>
    )
}