// api handler for getting products requests

export function getProductsRequest(
    {filters, limit, offset, sortedBy, ascending, category, petType}: {filters?: string[], limit?: number, offset?: number, sortedBy?: string, ascending?: boolean, category?: number, petType?: number}
) {
    // this is the go to function for getting several types of products get requests

    // the cases are:
    // 1. get all products, but with  limit and offset (for pagination)
    // 2. get all products, but with limit and offset and sorted by and ascending (for pagination and sorting)
    // 3. get all products, but with limit and offset and sorted by and ascending and filters (for pagination and sorting and filtering)
    // 4. get all products, but with limit and offset and sorted by and ascending and filters and narrowed by category (for pagination and sorting and filtering and category)
    // 5. get all products, but with limit and offset and sorted by and ascending and filters and narrowed by pet type (for pagination and sorting and filtering and pet type)
    
    // assign a value to ascending, sortedBy, limit and offset if they are not provided
    ascending = ascending || true;
    sortedBy = sortedBy || "popularity";
    limit = limit || 25;
    offset = offset || 0;

    // we will default limit to 25 and offset to 0 if not provided in any of the cases
    // and sortedBy will be popularity and ascending will be true if they are not provided
    // sorted by popularity for the moment this sorting is just not sorted
    if (filters && !category && petType) {
        // case 5
    } else if (filters && category && !petType) {
        // case 4
    } else if (filters && !category && !petType) {
        // case 3
    } else if (!filters && !category && !petType) {
        // case 2
    } else {
        // case 1
    }
    // return "get all products"
}

export function getProductByIdRequest(
    {productId} : {productId: number}
) {

}
