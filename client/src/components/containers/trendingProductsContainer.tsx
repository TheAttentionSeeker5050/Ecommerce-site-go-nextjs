import Link from "next/link"

export default function TrendingProductsContainer(
    trendingProductsContainerData: {
        containerTitle: string,
        trendingProductsArray: any[],
    }
) {
    return (
        <div>
            <h2 className="text-xl text-center my-4">{trendingProductsContainerData.containerTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-xl gap-3 px-3 mx-auto">
                {trendingProductsContainerData.trendingProductsArray.map((productData) => {
                    return (
                        <Link href={productData.productLink}>
                        <div className="w-32 mx-auto p-2 dark:hover:shadow-white hover:shadow-lg hover:shadow-zinc-500 ">
                            <img className="w-28 rounded-md mx-auto" src={
                                productData.productImageSrc
                            } />
                            <p className="text-md text-center">
                                {productData.productName}
                            </p>
                            <p className="text-md text-center font-bold">
                                ${productData.price}
                            </p>
                        </div>
                        </Link>
                    )}
                )}
            </div>
        </div>

    )
}