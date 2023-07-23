"use client";
import CategoriesBrowseContainer from "@/components/containers/products-browse/categoriesBrowseContainer";
import ProductBrowseContainer from "@/components/containers/products-browse/productBrowseContainer";
import ProductFilterContainer from "@/components/containers/products-browse/productFilterContainer";
import { getProductFeaturesFromQueryString } from "@/utils/urlSearchFilters";

export default function ProductBrowseListingByCategoryPage({params}: { params: {category: string} }) {
    // get the query params from the url
    const urlSearchParams = new URLSearchParams(window.location.search);
    
    // get the url filter params and store them in the redux store
    getProductFeaturesFromQueryString();

    
    

    // the sorting and pagination logic will be handled here
        
    // first get the sorting and pagination state from the url
    // i am using variables and the url search params object because i want to be able to change the sorting and pagination state without reloading the page and not dealing with async execution
    // i may change to somethign else later
    let sortedBy = urlSearchParams.get("sort") || "popularity";
    let ascending = urlSearchParams.get("ascending") === "true" || false;
    let pagination = parseInt(urlSearchParams.get("page") || "1");
    
    return (
        <div id="p-content" className="w-full">
            <h1 className="text-2xl font-bold text-center">{"Browse products: "+params.category}</h1>
            <div className="flex flex-row gap-2 flex-wrap justify-evenly">
                <ProductFilterContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} />
                <ProductBrowseContainer sortedBy={sortedBy} ascending={ascending} pagination={pagination} />
            </div>
        </div>
    )
}