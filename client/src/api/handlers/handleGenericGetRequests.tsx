export const handleGetRequests = async (
    getRequestRoute:string,
    ): Promise<void> => {
    try {
        // create an url request string using environment variables
        // declare the url variable as string
        var url: string;
        if (process.env.NODE_ENV === 'development') {
            url = `${process.env.API_URL}${getRequestRoute}`;
        } else {
            url = `${process.env.API_URL_REMOTE}${getRequestRoute}`;
        }

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

        // get the response data
        const responseData = await response.json();

        // check if the response is ok
        if (response.ok) {
            // // set the token in local storage
            // console.log(responseData['callbackURL']);
            // window.location.href = responseData['callbackURL'];

            // return the response data
            return responseData;
        } else {
            // // set the error messages
            // setErrorMessages([responseData['error']]);

            console.log(responseData);
        }
    } catch (error) {
        console.log(error);
    }
}