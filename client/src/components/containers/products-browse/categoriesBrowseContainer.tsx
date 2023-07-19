// a container for the products category browse page

import {  productCategories } from "@/data/dummyData/productsDummyData"

export default function CategoriesBrowseContainer(
) {
    // populate the categories array
    const productCategoryArray = productCategories
    return (
        <div id="p-content" className="w-full">
            <h1 className="text-2xl font-bold text-center">Browse our Products</h1>
            <div id="product-categories-container" className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 max-w-6xl mx-auto gap-4 p-4 ">
                {productCategoryArray.map((categoryData) => {
                    return (
                        <div className="max-w-xs w-9/12 h-52 mx-auto phone:w-44 phone:h-44 text-white bg-blue-500 grid place-content-center" style={
                            {
                                backgroundImage: `url(${categoryData.categoryImageSrc})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }
                        } key={categoryData.key}>
                            <p className="text-md text-center p-1 bg-white text-black rounded-md">
                                {
                                    categoryData.category
                                }
                            </p>
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}