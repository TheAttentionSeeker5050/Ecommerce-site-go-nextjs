import { ButtonRedirectPrimary } from "@/components/buttons/buttonPrimary";




export default function ProductHighlightedContainer(
    productData: {
        productName: string,
        price: number,
        productImageSrc: string,
        productDescription: string,
        productHighlight: string,
        productLink: string,
    }
) {

    return (
        <div className="flex flex-row flex-wrap w-full justify-around gap-3.5 p-4 bg-pink-300 dark:bg-secondary-dark">
                <div className="">
                    <img className="w-72 rounded-md" src={
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