
// import dummy data
import { productsArray } from "@/data/dummyData/productsDummyData"

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faDollarSign, faFire, faList, faStar, faTableCells } from "@fortawesome/free-solid-svg-icons";
import ProductFilterContainer from "./productFilterContainer";
import { useState } from "react";



export default function ProductBrowseContainer(

) {
    // get the query params from the url
    const urlSearchParams = new URLSearchParams(window.location.search)
    

    // the sorting and pagination logic will be handled here
    // ---------------------------------------------
    // first add the state for the sorting and pagination
    const [sortedBy, setSortedBy] = useState(urlSearchParams.get("sort") || "popularity")
    const [ascending, setAscending] = useState(urlSearchParams.get("ascending") === "true" || false)
    // get page as a number
    const [pagination, setPagination] = useState(parseInt(urlSearchParams.get("page") || "0"))


    // the handler for the sorting and pagination
    function handleSorting(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        newSortedBy: string,
    ) {
        event.preventDefault()
        // set the sorting state
        // if the sorting is already set to the same value, then change the sorting order
        new Promise((resolve, reject) => {
            if (newSortedBy === sortedBy) {
                setAscending(!ascending)
            } else {
                setSortedBy(newSortedBy)
                setAscending(false)
            }
            resolve(null)
        })
        .then(() => {
            // now get the base url from current location
            const currentLocation = window.location.href .split("?")[0]
            const isSearch = window.location.href.includes("?")

            let newLocation = currentLocation + "?"

            // if pagination, then add the pagination query to the url
            if (pagination !== 0) {
                newLocation += "page=" + pagination
            }
            // if sorting, then add the sorting query to the url
            // if (isSearch) {
                newLocation += "&sort=" + sortedBy+ "&ascending=" + ascending
            // }
            return newLocation
        })
        .then((newLocation) => {

            // redirect to the new url
            window.location.href = newLocation
        })
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
            
        return <></>
        
    }

    console.log("sorted by: ", sortedBy, "ascending: ", ascending, "pagination: ", pagination)

    return (
        <div id="content-wrapper" className="flex flex-row gap-3 flex-wrap justify-evenly">
            
            <ProductFilterContainer />

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
                        <a href="">
                            <FontAwesomeIcon icon={faList} />
                        </a>
                        <a href="">
                            <FontAwesomeIcon icon={faTableCells} />
                        </a>
                    </div>
                    <ul id="pagination" className="flex flex-row gap-3 justify-center">
                        <li>Start</li>
                        <li>Previous</li>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>Next</li>
                        <li>End</li>
                    </ul>
                </div>
                <div id="products-container-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">
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