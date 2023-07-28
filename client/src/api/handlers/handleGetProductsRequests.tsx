// api handler for getting products requests

export async function getProductsRequest(
    {filters, limit, offset, sortedBy, sortOrder, category, petType}: {filters?: string[], limit?: number, offset?: number, sortedBy?: string, sortOrder?: string, category?: string, petType?: string}
) {
    // this is the go to function for getting several types of products get requests --------------------------

    // the cases for url addresses are:
    // 1. get all products by pet type category 
    // 2. get all products by category
    // 3. get all products

    // in the case of filter, pagination and sorting, we add each argument when specified

    // get the base url from the env file
    let baseURL = process.env.API_URL as string;
    // if on development, use the development url
    if (process.env.NODE_ENV !== "development") {
        baseURL = process.env.API_URL_REMOTE as string;
    }

    let queryString = "";
    
    // state the url per case withouth pagination and sorting and filters
    if (!category && petType) {
        // case 1
        queryString = `${baseURL}/products/products/by-pet-type/${petType}`

    } else if (category && !petType) {
        // case 2
        queryString = `${baseURL}/products/products/by-category/${category}`

    } else  {
        // case 3
        queryString = `${baseURL}/products/products/all`
    }

    // add pagination and sorting on top of the base url ----------------------------------------------
    // first validate query params
    if (limit && limit < 0) {
        throw Error("limit cannot be negative");
    } else if (offset && offset < 0) {
        throw Error("offset cannot be negative");
    } else if (sortedBy && !["popularity", "price"].includes(sortedBy)) {
        throw Error("sortedBy must be either popularity or price");
    } else if (sortOrder && !["asc", "desc"].includes(sortOrder)) {
        throw Error("sortOrder must be either asc or desc");
    }

    // make sure that the limit and offset are integer number
    if (limit && Number.isInteger(limit)) {
        queryString += `?limit=${limit}`;
    } else {
        queryString += `?limit=25`; // we add a default limit so the url matches the api config (because it must start with a ? and not &)
    }

    if (offset && Number.isInteger(offset)) {
        queryString += `&offset=${offset}`;
    }
    if (sortedBy) {
        queryString += `&sorted_by=${sortedBy}`;
    }
    if (sortOrder) {
        queryString += `&sort_order=${sortOrder}`;
    }

    console.log("querystring:", queryString);


    // add query search parameters to the query string if they are provided
    // using filters object array and other handler function params

    // make the request
    const response = await fetch(queryString);
    
    // get the data
    const data = await response.json();

    // handle error
    if (!response.ok) {
        throw Error(response.statusText);
    }

    // return the data
    return data;
}



export async function getProductByIdRequest(
    {productId} : {productId: number}
) {
    // get the base url from the env file
    let baseURL = process.env.API_URL as string;
    // if on development, use the development url
    if (process.env.NODE_ENV !== "development") {
        baseURL = process.env.API_URL_REMOTE as string;
    }

    // the fetch request
    const response = await fetch(`${baseURL}/products/products/by-id/${productId}`)

    const data = await response.json();

    // handle error
    if (!response.ok) {
        throw Error(response.statusText);
    }

    // return the data
    return data;

}
