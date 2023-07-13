import { productFilterSlice } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import React from "react";

export function handleClickFilterStateChange(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newNumValue: number,
    renderSW: boolean,
    setRenderSW: React.Dispatch<React.SetStateAction<boolean>>,
) {
    // get the current state of the filter object from  the redux reducer
    if (event.currentTarget.parentElement?.id === "rating-filter-container") {
        // else if check if the parent is rating-filter-container
        // change the rating value
        reduxStore.dispatch(productFilterSlice.actions.changeMinRating(newNumValue));
        setRenderSW(!renderSW);
    }
}

export default function DisplayStarRatingButtons(
    {numStars, renderSW, setRenderSW} : {numStars: number, renderSW: boolean, setRenderSW: React.Dispatch<React.SetStateAction<boolean>>},
) {

    if (reduxStore.getState().productFilter.value.minRating === numStars) {
        return (
            <button id={`${numStars}-stars-rating`} className="text-start hover:text-orange-600 text-orange-400 " onClick={(e) => handleClickFilterStateChange(e, numStars, renderSW, setRenderSW)}>
                {Array(numStars).fill(<FontAwesomeIcon icon={faStar}  />) }
            </button>
        )
    } else {
        return (
            <button id={`${numStars}-stars-rating`}  className="text-start hover:text-yellow-500 text-yellow-300" onClick={(e) => handleClickFilterStateChange(e, numStars, renderSW, setRenderSW)}>
                {Array(numStars).fill(<FontAwesomeIcon icon={faStar}  />) }
            </button>
        )
    }
}