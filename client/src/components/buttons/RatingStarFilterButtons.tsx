// redux imports
import { changeMinRating } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";

// font awesome imports
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// react imports
import { useState } from "react";
import React from "react";



export default function DisplayStarRatingButtons(
    {numStars,renderSW, setRenderSW} : {numStars: number, renderSW: boolean, setRenderSW: React.Dispatch<React.SetStateAction<boolean>>}

) {

    // handle the click event for the filter buttons
    // we are going to use the redux store to store the filter state
    function handleClickFilterStateChange(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        newNumValue: number,
    ) {
        // get the current state of the filter object from  the redux reducer
        if (event.currentTarget.parentElement?.id === "rating-filter-container") {
            // else if check if the parent is rating-filter-container
            // change the rating value
            reduxStore.dispatch(changeMinRating(newNumValue));
            setRenderSW(!renderSW);
        }
    }


    // render the button depending on the current state of the filter
    // if the current state of the filter is the same as the button value, then render the button as selected
    if (reduxStore.getState().productFilter.value.minRating == numStars) {
        return (
            <button id={`${numStars}-stars-rating`} className="text-start hover:text-orange-600 text-orange-400 " onClick={(e) => handleClickFilterStateChange(e, numStars)}>
                {Array(numStars).fill(<FontAwesomeIcon icon={faStar} />) }
            </button>
        )
    } else {
        // else render the button as unselected
        return (
            <button id={`${numStars}-stars-rating`}  className="text-start hover:text-yellow-500 text-yellow-300" onClick={(e) => handleClickFilterStateChange(e, numStars)}>
                {Array(numStars).fill(<FontAwesomeIcon icon={faStar}  />) }
            </button>
        )
    }
}