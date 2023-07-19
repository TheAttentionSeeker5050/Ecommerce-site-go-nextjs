// import redux store methods and data 
// import { productsArray, dummyProductSearchFilters } from "@/data/dummyData/productsDummyData";

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faDollarSign, faFire, faList, faStar, faTableCells } from "@fortawesome/free-solid-svg-icons";

// import the utility functions that will be used in this container
import getURLSearchFilterString from "@/utils/urlSearchFilters";
import Link from "next/link";

// redux store methods
import { reduxStore } from "@/data/redux/reduxStore";
import { formatProductTitleInGridThumbView } from "@/utils/formatThumbnailTitle";


export default function ProductBrowseContainer(
        // add the sorting and pagination state as props
        {sortedBy, ascending, pagination} : {sortedBy: string, ascending: boolean, pagination: number}
    ) {

    // get the products array from the redux store
    const productsArray = reduxStore.getState().product.value;
    console.log("array: \n");
    console.log(productsArray);
    
    // the handler for the sorting and pagination
    function handleSorting(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newSortedBy: string,
    ) {
        event.preventDefault();
        // change the sorting state if needed
        // if the sorting is already set to the same value, then change the sorting order
        if (newSortedBy === sortedBy) {
            ascending = !ascending;
        } else {
            sortedBy = newSortedBy;
            ascending = false;
        }

        // redirect to the new url
        window.location.href = getURLSearchFilterString({
            pageNumber: pagination,
            orderBy: sortedBy,
            ascending: ascending,
        });
    }


    function handlePagination(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newPagination: number,
    ) {
        event.preventDefault();
        // change the pagination state if needed
        if (newPagination < 1) {
            newPagination = 1;
        } else {
            pagination = newPagination;
        }

        window.location.href = getURLSearchFilterString({
            pageNumber: pagination,
            orderBy: sortedBy,
            ascending: ascending,
        });
    }
    
    const ArrowIconComponent = (
        {sortByInput} : {sortByInput: string}
    ) => {
        // if the sorted by input is the same as the current sorting state, and order is ascending, then return the up arrow
        if (sortByInput === sortedBy && ascending) {
            return (
                <FontAwesomeIcon icon={faArrowUp} />
            )
        } else if (sortByInput === sortedBy && !ascending) {
            return (
                <FontAwesomeIcon icon={faArrowDown} />
            )
        }
    }


    return (
        

        <div id="products-container-wrapper" className="flex flex-col my-5 w-auto mx-4">
            <div id="products-container-upper-view-opts " className="bg-primary-light dark:bg-primary-dark dark:text-black text-white p-4 rounded-t-xl border-2 border-black dark:border-white flex flex-col flex-wrap  gap-3 ">
                <div id="sorting" className="flex flex-row gap-3 justify-center">
                    <a href="" onClick={(e) => handleSorting(e, "price")}>
                        <ArrowIconComponent sortByInput="price" />
                        <FontAwesomeIcon icon={faDollarSign} />
                    </a>
                    <a href="" onClick={(e) => handleSorting(e, "ratings")}>
                        <ArrowIconComponent sortByInput="ratings" />
                        <FontAwesomeIcon icon={faStar} />
                    </a>
                    <a href="" onClick={(e) => handleSorting(e, "popularity")}>
                        <ArrowIconComponent sortByInput="popularity" />
                        <FontAwesomeIcon icon={faFire} />
                    </a>
                    <a href="" className="ml-auto">
                        <FontAwesomeIcon icon={faList} />
                    </a>
                    <a href="">
                        <FontAwesomeIcon icon={faTableCells} />
                    </a>
                </div>
                <div id="pagination" className="flex flex-row gap-3 justify-center">
                    <a href="" onClick={(e) => handlePagination(e, pagination-1)}>Previous</a>
                    <a href="" onClick={(e) => handlePagination(e, pagination+1)}>Next</a>
                </div>
            </div>
            <div id="products-container-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">
                {productsArray.map((productData) => {
                    return (
                        <Link className="w-32 mx-auto" href={productData.productLink} key={productData.key}>
                            
                            <img className="w-28 rounded-md mx-auto" src={
                                productData.productImageSrc
                            } />
                            <p className="text-md text-center">
                                {
                                    formatProductTitleInGridThumbView(productData.productName)
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