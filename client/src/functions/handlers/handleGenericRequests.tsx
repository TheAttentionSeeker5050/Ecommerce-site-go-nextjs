import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";

export const handleGetRequests = async (
    getRequestRoute: string,
    ) => {
        // this will handle the get requests using fetch
    
    // get the server request url
    const url = getServerRequestURL(getRequestRoute);

    const corsOrigin = getCorsOrigin();

    const response = await fetch(url,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": corsOrigin,
            },
        }
    )


    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // get the response data
    const responseData = await response.json();
    // check if the response is ok
    return responseData;
}

export const handlePostRequests = async (
    getRequestRoute: string,
    requestBody?: any,
    ) => {
        // this will handle the get requests using fetch
    
    // get the server request url
    const url = getServerRequestURL(getRequestRoute);

    const corsOrigin = getCorsOrigin();

    const response = await fetch(url,
        {
            method: "POST",
            // mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                // "Access-Control-Allow-Origin": corsOrigin,
                // 'Accept': 'application/json',
            },
            body: requestBody ? JSON.stringify(requestBody) : null,
        }
    )


    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }
    
    // get the response data
    const responseData = await response.json();
    // check if the response is ok
    return responseData;
}