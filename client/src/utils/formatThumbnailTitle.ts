export function formatProductTitleInGridThumbView(
    productTitle: string,
) {
    // if the product title is longer than 25 characters, truncate it and add ellipsis
    if (productTitle.length > 25) {
        return productTitle.slice(0, 25) + "...";
    } else {
        return productTitle;
    }
}

export function formatProductTitleInListView(
    productTitle: string,
) {
    // if the product title is longer than 50 characters, truncate it and add ellipsis
    if (productTitle.length > 50) {
        return productTitle.slice(0, 50) + "...";
    } else {
        return productTitle;
    }
}