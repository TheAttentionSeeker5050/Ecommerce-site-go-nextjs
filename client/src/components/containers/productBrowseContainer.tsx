"use client"

// import dummy data
import { productsArray } from "@/data/dummyData/productsDummyData"

// import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faDollarSign, faFire, faList, faStar, faTableCells } from "@fortawesome/free-solid-svg-icons";
import ProductFilterContainer from "./productFilterContainer";

export default function ProductBrowseContainer(

) {
    
    return (
        <div id="content-wrapper" className="flex flex-row gap-3 flex-wrap justify-evenly">
            
            <ProductFilterContainer />

            <div id="products-container-wrapper" className="flex flex-col my-5 w-auto mx-4">
                <div id="products-container-upper-view-opts " className="bg-primary-light dark:bg-primary-dark dark:text-black text-white p-4 rounded-t-xl border-2 border-black dark:border-white flex flex-col flex-wrap  gap-3 ">
                    <ul id="sorting" className="flex flex-row gap-3 justify-center">
                        <li>
                            <FontAwesomeIcon icon={faArrowUp} />
                            <FontAwesomeIcon icon={faArrowDown} />
                            <FontAwesomeIcon icon={faDollarSign} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faStar} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faFire} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faList} />
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faTableCells} />
                        </li>
                    </ul>
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