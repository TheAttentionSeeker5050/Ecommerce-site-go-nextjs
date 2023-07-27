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
import { reduxStore } from "@/data/redux/reduxStore";
import { formatProductTitleInGridThumbView } from "@/utils/formatThumbnailTitle";


export default function ProductBrowseContainer(
        // add the sorting and pagination state as props
        {sortedBy, sortOrder, limit, offset, products, setSortedBy, setSortOrder, setLimit, setOffset, router} :
        {sortedBy: string, sortOrder: string, limit: number, offset: number, products: any[], setSortedBy: any, setSortOrder: any, setLimit: any, setOffset: any, router: any}
    ) {
    
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

        // redirect to the new 
        let newQueryset = getURLSearchFilterString({
            limit: limit,
            offset: offset,
            orderBy: sortedBy,
            sortOrder: sortOrder,
        });

        console.log("newQueryset:", newQueryset);
        console.log("window.location.href:", window.location.href);
        window.location.href = newQueryset;

        // router.push(getURLSearchFilterString({
        //     limit: limit,
        //     offset: offset,
        //     orderBy: sortedBy,
        //     sortOrder: sortOrder,
        // }));
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

        // redirect to the new url
        window.location.href = getURLSearchFilterString({
            limit: limit,
            offset: offset,
            orderBy: sortedBy,
            sortOrder: sortOrder,
        });

        // router.push(getURLSearchFilterString({
        //     limit: limit,
        //     offset: offset,
        //     orderBy: sortedBy,
        //     sortOrder: sortOrder,
        // }));
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
                    <Link href="" onClick={(e) => handleSorting(e, "price")}>
                        <ArrowIconComponent sortByInput="price" />
                        <FontAwesomeIcon icon={faDollarSign} />
                    </Link>
                    <Link href="" 
                    // onClick={(e) => handleSorting(e, "ratings")}
                    >
                        <ArrowIconComponent sortByInput="ratings" />
                        <FontAwesomeIcon icon={faStar} />
                    </Link>
                    <Link href="" 
                    // onClick={(e) => handleSorting(e, "popularity")}
                    >
                        <ArrowIconComponent sortByInput="popularity" />
                        <FontAwesomeIcon icon={faFire} />
                    </Link>
                    <Link href="" className="ml-auto">
                        <FontAwesomeIcon icon={faList} />
                    </Link>
                    <Link href="">
                        <FontAwesomeIcon icon={faTableCells} />
                    </Link>
                </div>
                <div id="pagination" className="flex flex-row gap-3 justify-center">
                    <Link href="" onClick={(e) => handlePagination(e, "+")}>Previous</Link>
                    <Link href="" onClick={(e) => handlePagination(e, "-")}>Next</Link>
                </div>
            </div>
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
        </div>
    )
}