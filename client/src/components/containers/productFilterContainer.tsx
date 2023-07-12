import { dummyProductSearchFilters } from "@/data/dummyData/productsDummyData"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ButtonWithActionPrimary } from "../buttons/buttonPrimary"

// the container for the product filters
export default function ProductFilterContainer(

) {
    return (
        <div id="products-container-wrapper" className=" flex-col my-5 w-auto mx-4 w-3/12 max-w-xs hidden lg:flex">
            <div id="products-container-upper-view-opts " className="bg-primary-light dark:bg-primary-dark dark:text-black text-white p-4 rounded-t-xl border-2 border-black dark:border-white flex flex-col flex-wrap  gap-3 ">
                Filters    
            </div>
            <div id="products-container-grid" className="flex flex-col gap-3 px-3 py-5  border-black dark:border-primary-dark border-2 border-t-0 rounded-b-xl">
                
                {/* first have a min and max boxes for minimum and maximum price */}
                <div className="flex flex-col gap-3">
                    <span>Price</span>
                    <div className="flex flex-row gap-2  w-full">
                        <input type="number" placeholder="Min" className="w-1/2 border-2 px-2 py-0.5 rounded-md border-black dark:border-primary-dark" value={dummyProductSearchFilters.price.min}/>
                        <span>-</span>
                        <input type="number" placeholder="Max" className="w-1/2 border-2 px-2 py-0.5 rounded-md border-black dark:border-primary-dark" value={dummyProductSearchFilters.price.max}/>
                    </div>
                </div>

                {/* then we have a list of buttons with 1 to 4 stars for product ratings */}
                <div className="flex flex-col gap-1">
                    <span>Minimum rating</span>
                    <button id="4-stars-rating" className="text-start hover:text-yellow-500 text-yellow-400">
                        {Array(4).fill(<FontAwesomeIcon icon={faStar}  />) }
                    </button>
                    <button id="3-stars-rating" className="text-start hover:text-yellow-500 text-yellow-400">
                        {Array(3).fill(<FontAwesomeIcon icon={faStar}  />) }
                    </button>
                    <button id="2-stars-rating" className="text-start hover:text-yellow-500 text-yellow-400">
                        {Array(2).fill(<FontAwesomeIcon icon={faStar}  />) }
                    </button>
                    <button id="1-stars-rating" className="text-start hover:text-yellow-500 text-yellow-400">
                        {Array(1).fill(<FontAwesomeIcon icon={faStar}  />) }
                    </button>

                </div>
                
                {/* list all the contents of the contents of the dummy search filters object structure dinamically and use select boxes to allow to select feature options, as well as adding a submit button */}


                {/* the submit button */}
                <ButtonWithActionPrimary text="Apply filters" onClick={() => alert("Ring Ring")}/>

                
                {/* <ul>
                    <li>Your</li>
                    <li>Products</li>
                    <li>Filters</li>
                    <li>Will</li>
                    <li>Go</li>
                    <li>Here</li>
                </ul> */}
            </div>
        </div>
    )
}