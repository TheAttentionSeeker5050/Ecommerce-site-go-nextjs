// import dummy data
import { productsArray } from "@/data/dummyData/productsDummyData"


export default function ProductBrowseContainer(
    
) {
    return (
        <div id="content-wrapper" className="flex flex-row flex-wrap justify-evenly">

                <div id="product-filter-opts" className="w-1/3 max-w-sm hidden sm:flex">
                    The options like filter products will go here
                </div>
                <div id="products-container-wrapper" className="flex flex-col my-5">
                    <div id="products-container-upper-view-opts">
                        The options like sort and pagination will go here
                    </div>
                    <div id="products-container-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-xl gap-3 px-3 mx-auto">
                        {productsArray.map((productData) => {
                            return (
                                <div className="w-32 mx-auto">
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
                            )}
                        )}
                    </div>
                </div>
            </div>
    )
}