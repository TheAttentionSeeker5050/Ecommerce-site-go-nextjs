import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";



export const handleChangeEmail = async (
    getRequestRoute: string,
    newEmail: string,
) => {
    // this request will make use of the access token stored in cookies. At the same time it will renew the access token if it is expired (tbi)

    // get the server request url
    const url = getServerRequestURL(getRequestRoute);

    // get cors origin 
    const corsOrigin = getCorsOrigin();

    // make the request using the token in cookies
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": corsOrigin,
        },
        body: JSON.stringify({
            email: newEmail,
        }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(`Error: ${responseData.error}`);
    }

    return responseData;

}