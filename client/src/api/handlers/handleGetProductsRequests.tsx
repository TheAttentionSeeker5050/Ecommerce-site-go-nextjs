// api handler for getting products requests

export async function getProductsRequest(
    {filters, limit, offset, sortedBy, sortOrder, category, petType}: {filters?: string[], limit?: number, offset?: number, sortedBy?: string, sortOrder?: string, category?: string, petType?: string}
) {
    // this is the go to function for getting several types of products get requests

    // the cases are:
    // 1. get all products, but with  limit and offset (for pagination)
    // 2. get all products, but with limit and offset and sorted by and ascending (for pagination and sorting)
    // 3. get all products, but with limit and offset and sorted by and ascending and filters (for pagination and sorting and filtering)
    // 4. get all products, but with limit and offset and sorted by and ascending and filters and narrowed by category (for pagination and sorting and filtering and category)
    // 5. get all products, but with limit and offset and sorted by and ascending and filters and narrowed by pet type (for pagination and sorting and filtering and pet type)
    
    
    

    // get the base url from the env file
    let baseURL = process.env.API_URL as string;
    // if on development, use the development url
    if (process.env.NODE_ENV !== "development") {
        baseURL = process.env.API_URL_REMOTE as string;
    }

    let queryString = "";
    
    // we will default limit to 25 and offset to 0 if not provided in any of the cases
    // and sortedBy will be popularity and ascending will be true if they are not provided
    // sorted by popularity for the moment this sorting is just not sorted
    if (!category && petType) {
        // case 5
        queryString = `${baseURL}/products/products/by-pet-type/${petType}`

    } else if (category && !petType) {
        // case 4
        queryString = `${baseURL}/products/products/by-category/${category}`

    } else  {
        // case 3, 2 and 1
        queryString = `${baseURL}/products/products`
    }

    // add pagination and sorting on top of the base url
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

    // add query search parameters to the query string if they are provided
    // using filters object array and other handler function params

    // case 1
    const response = await fetch(queryString);
    
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
