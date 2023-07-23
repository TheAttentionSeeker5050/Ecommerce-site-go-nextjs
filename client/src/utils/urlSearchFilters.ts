// in this file we will define the filters that we will use to filter the search results

import { dummyProductSearchFilters, product } from "@/data/dummyData/productsDummyData";
import { changeMinRating, changePriceMax, changePriceMin, changeProductFeatureSelected } from "@/data/redux/productFilterStore";
import { reduxStore } from "@/data/redux/reduxStore";
import { getQuerysetFromURL } from "./routeUtils";

// these methods will return a string that will be appended to the url (the first part before the ? question mark)
export default function getURLSearchFilterString(
    {orderBy, ascending, pageNumber, minPrice, maxPrice, minRating, features}: {orderBy: string, ascending: boolean, pageNumber?: number, minPrice?: number, maxPrice?: number, minRating?: number, features?: any[]} // idk if should be Object, object or any, well see

    // } // idk if should be Object, object or any, well see
) {
    // the first part of this query will be the ordering of the results
    let query = `?orderBy=${orderBy}&ascending=${ascending}`;

    // if the page number is provided, we will add it to the query
    if (pageNumber) {
        query += `&pageNumber=${pageNumber}`;
    }

    // if the min price is provided, we will add it to the query
    if (minPrice) {
        query += `&minPrice=${minPrice}`;
    }

    // if the max price is provided, we will add it to the query
    if (maxPrice) {
        query += `&maxPrice=${maxPrice}`;
    }

    // if the min rating is provided, we will add it to the query
    if (minRating) {
        query += `&minRating=${minRating}`;
    }

    // if the features are provided, we will add them to the query
    if (features) {
        // we will iterate through the features and add them to the query
        for (let i = 0; i < features.length; i++) {
            // inside the features array, each feature is an object with the following properties:
            // name: string
            // options: any[]
            // the contents of options have the following properties:
            // name: string
            // selected: boolean
            // we will iterate through the options and add them to the query
            for (let j = 0; j < features[i].options.length; j++) {
                if (features[i].options[j].selected) {
                    query += `&${features[i].name}=${features[i].options[j].name}`;
                }
            }
        }
    }

    return query;
}

export function getProductFeaturesFromQueryString() {
    // this function will save into our Redux store the features that are in the query string
    // first we will store all of our query params features in an array
    const urlSearchParams = new URLSearchParams(getQuerysetFromURL());

    // we will store the filters from the redux store in a variable
    let productFilters = reduxStore.getState().productFilter.value;

    // we will iterate through the query params and store the features
    for (const [key, value] of urlSearchParams as any) {
        // first we will check if the key is orderBy, ascending, or pageNumber
        if (key === "orderBy" || key === "ascending" || key === "pageNumber") {
            // we will skip these keys
            continue;
        } else if (key === "minPrice") {
            // if the key is minPrice
            reduxStore.dispatch(changePriceMin(value));
        } else if (key === "maxPrice") {
            reduxStore.dispatch(changePriceMax(value));
        } else if (key === "minRating") {
            reduxStore.dispatch(changeMinRating(value));
        } else {
            // // now we will add the features
            // productFilters.features = productFilters.features || [];


            // we will find the feature with the name of the key
            const featureIndex = productFilters.features.findIndex(feature => feature.name === key);

            // now we will find the option with the name of the value
            const optionIndex = productFilters.features[featureIndex].options.findIndex(option => option.name === value);

            // use redux store to set the option to selected
            reduxStore.dispatch(changeProductFeatureSelected({featureIndex, optionIndex, selected: true}));

        }
    }

    
}