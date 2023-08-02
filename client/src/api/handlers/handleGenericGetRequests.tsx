import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";

export const handleGetRequests = async (
    getRequestRoute: string,
    ) => {
        // this will handle the get requests using fetch
    
    // get the server request url
    const url = getServerRequestURL(getRequestRoute);

    const response = await fetch(url)


    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // get the response data
    const responseData = await response.json();
    // check if the response is ok
    return responseData;
}