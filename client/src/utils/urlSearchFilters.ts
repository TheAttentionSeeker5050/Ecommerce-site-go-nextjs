// in this file we will define the filters that we will use to filter the search results
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