export const handleGetRequests = async (
    getRequestRoute:string,
    ) => {

    // create an url request string using environment variables
    // declare the url variable as string
    var url: string;
    if (process.env.NODE_ENV === 'development') {
        url = `${process.env.API_URL}${getRequestRoute}`;
    } else {
        url = `${process.env.API_URL_REMOTE}${getRequestRoute}`;
    }
    
    console.log("request url:", url);

    // create a control origin header based on environment type
    var controlOrigin: string;
    if (process.env.NODE_ENV === 'development') {
        controlOrigin = "http://currentdevelopment.local:3001";
    } else {
        controlOrigin = "https://ecommerce-x.alligatorcode.pro";
    }
    // make a post request using fetch, the new user data var and cors headers
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': controlOrigin,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // get the response data
    const responseData = await response.json();
    // check if the response is ok
    return responseData;
}