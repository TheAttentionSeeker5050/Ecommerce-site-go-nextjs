// import redux store methods and data 
// import { productsArray, dummyProductSearchFilters } from "@/data/dummyData/productsDummyData";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faDollarSign, faFire, faList, faStar, faTableCells } from "@fortawesome/free-solid-svg-icons";

// import the utility functions that will be used in this container
import getURLSearchFilterString from "@/utils/urlSearchFilters";
import Link from "next/link";
import Image from "next/image";

// redux store methods
import { formatProductTitleInGridThumbView } from "@/utils/formatThumbnailTitle";
import { useEffect, useState } from "react";

// name constants grid and list view
const LIST_VIEW = "list";
const GRID_VIEW = "grid";

export default function ProductBrowseContainer(
        // add the sorting and pagination state as props
        {sortedBy, sortOrder, limit, offset, products, setSortedBy, setSortOrder, setLimit, setOffset, router} :
        {sortedBy: string, sortOrder: string, limit: number, offset: number, products: any[], setSortedBy: any, setSortOrder: any, setLimit: any, setOffset: any, router: any}
    ) {
    
    // visibility state for displaying between list and grid view
    const [view, setView] = useState("grid");

    // the handler for the sorting and pagination
    async function handleSorting(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newSortedBy: string,
    ) {
        event.preventDefault();
        // change the sorting state if needed
        // if the sorting is already set to the same value, then change the sorting order
        if (newSortedBy === sortedBy) {
            await setSortOrder(sortOrder === "desc" ? "asc" : "desc");
        } else {
            await setSortedBy(newSortedBy);
            await setSortOrder("desc");
        }

        // redirect to the new url
        await router.push(getURLSearchFilterString({
            limit: limit,
            offset: offset,
            orderBy: sortedBy,
            sortOrder: sortOrder,
        }));
    }


    async function handlePagination(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newPagination: string,
    ) {
        event.preventDefault();
        
        // change the pagination state if needed
        if (newPagination === "+" ) {
            await setOffset(offset + limit);
        } else if (newPagination === "-" && offset >= limit) {
            await setOffset(offset - limit);
        }

        await router.push(getURLSearchFilterString({
            limit: limit,
            offset: offset,
            orderBy: sortedBy,
            sortOrder: sortOrder,
        }));
    }

    function toggleListGridView(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newView: string,
    ) {
        event.preventDefault();
        
        if (newView === GRID_VIEW) {
            setView(GRID_VIEW);
        } else {
            setView(LIST_VIEW);
        }
    }
    
    const ArrowIconComponent = (
        {sortByInput} : {sortByInput: string}
    ) => {
        // if the sorted by input is the same as the current sorting state, and order is ascending, then return the up arrow
        if (sortByInput == sortedBy && sortOrder === "asc") {
            return (
                <FontAwesomeIcon icon={faArrowUp} />
            )
        } else if (sortByInput === sortedBy && sortOrder === "desc") {
            return (
                <FontAwesomeIcon icon={faArrowDown} />
            )
        }
    }

    return (
        

        <div id="products-container-wrapper" className="flex flex-col my-5 w-auto mx-4">
            <div id="products-container-upper-view-opts " className="bg-primary-light dark:bg-primary-dark dark:text-black text-white p-4 rounded-t-xl border-2 border-black dark:border-white flex flex-col flex-wrap  gap-3 ">
                <div id="sorting" className="flex flex-row gap-3 justify-center">
                    <Link href="" onClick={(e) => handleSorting(e, "price")} className="cursor-pointer">
                        <ArrowIconComponent sortByInput="price" />
                        <FontAwesomeIcon icon={faDollarSign} />
                    </Link>
                    <Link href="" className="hidden"
                    // onClick={(e) => handleSorting(e, "ratings")}
                    >
                        <ArrowIconComponent sortByInput="ratings" />
                        <FontAwesomeIcon icon={faStar} />
                    </Link>
                    <Link href="" className="hidden"
                    // onClick={(e) => handleSorting(e, "popularity")}
                    >
                        <ArrowIconComponent sortByInput="popularity" />
                        <FontAwesomeIcon icon={faFire} />
                    </Link>
                    <Link href="" className="cursor-pointer" onClick={(e) => toggleListGridView(e, LIST_VIEW)}>
                        <FontAwesomeIcon icon={faList} />
                    </Link>
                    <Link href="" className="cursor-pointer" onClick={(e) => toggleListGridView(e, GRID_VIEW)} >
                        <FontAwesomeIcon icon={faTableCells} />
                    </Link>
                </div>
                <div id="pagination" className="flex flex-row gap-3 justify-center">
                    <Link href="" onClick={(e) => handlePagination(e, "-")} className="cursor-pointer">Previous</Link>
                    <Link href="" onClick={(e) => handlePagination(e, "+")} className="cursor-pointer">Next</Link>
                </div>
            </div>

            { view === GRID_VIEW ?
                <div id="products-container-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">

                    {products.map((productData) => {
                        return (
                            <Link className="w-32 mx-auto" href={`/product-pages/product/${productData.id}`} key={productData.id}>
                                
                                <Image width={120} height={120} alt={productData.name} className="w-28 rounded-md mx-auto" src={
                                    productData.product_image
                                } />
                                <p className="text-md text-center">
                                    {
                                        formatProductTitleInGridThumbView(productData.name)
                                    }
                                </p>
                                <p className="text-md text-center font-bold">
                                    ${productData.price}
                                </p>
                            </Link>
                        )}
                    )}
                </div>
            : 
                <div id="products-container-list" className="flex flex-col gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">
                    {/* <DisplayProducts /> */}
                    {products.map((productData) => {
                        return (
                            <Link className="w-full grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 justify-around h-40 content-evenly" href={`/product-pages/product/${productData.id}`} key={productData.id}>
                                
                                <Image width={120} height={120}  alt={productData.name} className="w-32 col-span-2 sm:col-span-2 mx-auto rounded-md " src={
                                    productData.product_image
                                } />
                                <p className="text-md text-center col-span-2 sm:col-span-3 md:w-80 p-2">
                                    {
                                        formatProductTitleInGridThumbView(productData.name)
                                    }
                                </p>
                                <p className="text-md text-center col-span-1 p-2 font-bold text-green-700">
                                    ${productData.price}
                                </p>
                            </Link>
                        )}
                    )}
                </div>
            }
            
        </div>
    )
}