export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const formatPercentage = (percentage: number) => {
    const formattedPercentage = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(percentage / 100);
  
    return formattedPercentage;
};

export function formatProductTitleInGridView(
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