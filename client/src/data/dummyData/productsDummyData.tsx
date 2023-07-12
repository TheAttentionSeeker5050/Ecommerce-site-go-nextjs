export const product = {
    productName: "Product Name",
    price: 100,
    productImageSrc: "https://cdn.pixabay.com/photo/2016/03/03/13/38/mouse-1234199_1280.jpg",
    productDescription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident maxime adipisci nemo cumque sint quia blanditiis minus, inventore rerum necessitatibus nisi fugit doloremque itaque",
    productHighlight: "taste this delicious product",
    productLink: "https://www.google.com",
}
// product array of size 25
export const productsArray = [
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
]

// the product filter object
// create a filter object to store the filter state
export const dummyProductSearchFilters = {
    price: {
        min: undefined,
        max: undefined,
    },
    maxRating: {
        min: undefined,
        max: undefined,
    },
    features: [
        {
            name: "feature-1",
            options: [
                {
                    name: "option-1",
                    selected: false,
                },
                {
                    name: "option-2",
                    selected: false,
                },
                {
                    name: "option-3",
                    selected: false,
                },
            ],
        },
        {
            name: "feature-2",
            options: [
                {
                    name: "option-1",
                    selected: false,
                },
                {
                    name: "option-2",
                    selected: false,
                },
                {
                    name: "option-3",
                    selected: false,
                },
            ],
        },
        {
            name: "feature-3",
            options: [
                {
                    name: "option-1",
                    selected: false,
                },
                {
                    name: "option-2",
                    selected: false,
                },
                {
                    name: "option-3",
                    selected: false,
                },
            ],
        },
        {
            name: "feature-4",
            options: [
                {
                    name: "option-1",
                    selected: false,
                },
                {
                    name: "option-2",
                    selected: false,
                },
                {
                    name: "option-3",
                    selected: false,
                },
            ],
        },
    ],
}