export const product = {
    key: 0,
    productName: "Product Name Product Name Product Name Product Name Product Name Product Name Product Name ",
    price: 100,
    productImageSrc: "https://cdn.pixabay.com/photo/2016/03/03/13/38/mouse-1234199_1280.jpg",
    productDescription: 
    [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident maxime adipisci nemo cumque sint quia blanditiis minus, inventore rerum necessitatibus nisi fugit doloremque itaque",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident maxime adipisci nemo cumque sint quia blanditiis minus, inventore rerum necessitatibus nisi fugit doloremque itaque",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio provident maxime adipisci nemo cumque sint quia blanditiis minus, inventore rerum necessitatibus nisi fugit doloremque itaque",
    ],
    productHighlight: "taste this delicious product",
    productLink: "/products/product/1", // this is the link to the product page, for now it is just 0 but it will be the product id when we prepare the rest api
}

// product array of size 25 and increase the key by 1 for each product
export const productsArray = populateProductArray(25, product);

function populateProductArray(size: number, data: any) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push({
            ...data,
            key: i,
        });
    }
    return array;
}

// the product filter object
// create a filter object to store the filter state
export const dummyProductSearchFilters = {
    price: {
        min: undefined,
        max: undefined,
    },
    minRating: undefined,
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