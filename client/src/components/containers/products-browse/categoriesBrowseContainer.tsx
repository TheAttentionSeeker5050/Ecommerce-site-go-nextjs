// a container for the products category browse page
import { handleGetRequests } from "@/api/handlers/handleGenericGetRequests";
import {  productCategories } from "@/data/dummyData/productsDummyData"
import Link from "next/link";
import { useEffect } from "react"

export default function CategoriesBrowseContainer(
    // product categories should be list of objects
    { productCategories,  title} : { productCategories: any[], title: string }
) {
    
    // console.log(productCategories);

    
    // populate the categories array
    return (
        <div id="p-content" className="w-full">
            <h2 className="text-2xl font-bold text-center ">
                {/* Browse our Products By Category */}
                {title}
            </h2>
            <div id="product-categories-container" className="grid grid-cols-1 phone:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 max-w-6xl mx-auto gap-3 p-4 ">
                
                {productCategories.map((categoryData) => {
                    return (
                        <Link href={`/product-pages/category/${categoryData.url_formatted_name}`} key={categoryData.id}> 
                            <div className="max-w-xs w-9/12 h-52 mx-auto phone:w-44 phone:h-44 text-white bg-blue-500 grid place-content-center rounded-xl" style={
                                {
                                    backgroundImage: `url(${categoryData.image_thumbnail_url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }
                            } key={categoryData.id}>
                                <p className="text-md text-center m-3 p-1 bg-white text-black rounded-md opacity-80">
                                    { 
                                        categoryData.category_name ? categoryData.category_name :
                                        categoryData.pet_name // if the category name is undefined, then it is a pet type
                                        // this makes it usable for both product categories and pet types
                                    }
                                </p>
                            </div>
                        </Link>
                    )}
                )}
            </div>

            
            
        </div>
    )
}

