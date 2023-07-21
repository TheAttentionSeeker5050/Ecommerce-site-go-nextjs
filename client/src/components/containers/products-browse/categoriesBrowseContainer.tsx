// a container for the products category browse page

import { handleGetRequests } from "@/api/handlers/handleGenericGetRequests";
import {  productCategories } from "@/data/dummyData/productsDummyData"
import { useEffect } from "react"

export default function CategoriesBrowseContainer(
) {
    
    let productCategoryArray = productCategories;
        
    let productCategoriesResponseBody = handleGetRequests("/products/category/");
    
    productCategoriesResponseBody.then((data) => {
        productCategoryArray = data.productCategoryList;
    })

    
    // populate the categories array
    return (
        <div id="p-content" className="w-full">
            <h2 className="text-2xl font-bold text-center">Browse our Products By Category</h2>
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

            <h2 className="text-2xl font-bold text-center">Browse our Products By Pet</h2>
            <div id="product-categories-container" className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 max-w-6xl mx-auto gap-4 p-4 ">
                {productCategoryArray.map((categoryData) => {
                    return (
                        <div className="max-w-xs w-9/12 h-52 mx-auto phone:w-44 phone:h-44 text-white bg-blue-500 grid place-content-center" style={
                            {
                                // backgroundImage: `url(${categoryData.categoryImageSrc})`,
                                backgroundImage: `url(https://cdn.pixabay.com/photo/2016/03/03/13/38/mouse-1234199_1280.jpg)`,
                                
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

