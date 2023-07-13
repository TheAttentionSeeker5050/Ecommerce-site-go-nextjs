
import { ButtonWithActionPrimary } from "../buttons/buttonPrimary";
import { productFilterSlice } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";
import { useState } from "react";
import DisplayStarRatingButtons from "../buttons/RatingStarFilterButtons";
import DisplayCheckboxFilters from "../cards/productFilterCheckBoxesComponent";

// the container for the product filters
export default function ProductFilterContainer(
    // add the sorting and pagination state as props
    {sortedBy, ascending, pagination} : {sortedBy: string, ascending: boolean, pagination: number}
) {
    

    // we are going to use the redux store to store the filter state
    // the filter state handler function below
    function handleTextFilterStateChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        // get the current state of the filter object from  the redux reducer
        if (event.target.name === "price-min") {
            // change the price min value
            reduxStore.dispatch(productFilterSlice.actions.changePriceMin(event.target.value));
        } else if (event.target.name === "price-max") {
            // change the price max value
            reduxStore.dispatch(productFilterSlice.actions.changePriceMax(event.target.value));
        } 
    }    
    
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
                        <input type="number" placeholder="Min" className="w-1/2 border-2 px-2 py-0.5 rounded-md border-black dark:border-primary-dark" name="price-min" value={reduxStore.getState().productFilter.value.price.min} onChange={(e) => handleTextFilterStateChange(e)}/>
                        <span>-</span>
                        <input type="number" placeholder="Max" className="w-1/2 border-2 px-2 py-0.5 rounded-md border-black dark:border-primary-dark" name="price-min" value={reduxStore.getState().productFilter.value.price.max} onChange={(e) => handleTextFilterStateChange(e)}/>
                    </div>
                </div>

                {/* then we have a list of buttons with 1 to 4 stars for product ratings */}
                <div id="rating-filter-container" className="flex flex-col gap-1">
                    <span>Minimum rating</span>
                    <DisplayStarRatingButtons numStars={4} />
                    <DisplayStarRatingButtons numStars={3} />
                    <DisplayStarRatingButtons numStars={2} />
                    <DisplayStarRatingButtons numStars={1} />
                </div>
                
                {/* list all the contents of the contents of the dummy search filters object structure dinamically and use checkboxes to allow to select feature options, as well as adding a submit button */}
                <DisplayCheckboxFilters />
                
                {/* the submit button */}
                <ButtonWithActionPrimary text="Apply filters" onClick={() => alert("Ring Ring")}/>
            </div>
        </div>
    )
}