import { validateEmail } from "@/functions/validators/validateEmail";
import { validatePassword } from "@/functions/validators/validatePassword";
import { getCorsOrigin, getServerRequestURL } from "@/utils/routeUtils";
import { get } from "http";

// login request handler with input validation and fetch request
export const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string | null | undefined,
    password: string | null | undefined,
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
    errorMessages: string[],
    ): Promise<any> => {
    
    // validation variables
    var emailIsValid, emailError;
    var passwordIsValid, passwordError;
    var errorsArray: string[] = [];

    // validate fields using function
    [emailIsValid, emailError] = validateEmail(email);
    [passwordIsValid, passwordError] = validatePassword(password);

    // add error messages on top of the previous error messages if any
    if (emailIsValid === false) {
        errorsArray.push(emailError);
        
    }

    if (passwordIsValid === false) {
        errorsArray.push(passwordError);
        
    }

    if (errorsArray.length > 0) {
        setErrorMessages(errorsArray);
        return;
    } else {
        try {

            // encode the data into raw json
            const loginData = {
                'email': email,
                'password': password,
            };
            
            // get the server request url
            let url = getServerRequestURL('/user/login');

            // declare the cors origin variable as string
            let controlOrigin = getCorsOrigin();

            // make a post request using fetch, the new user data var and cors headers
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': controlOrigin,
                },
                body: JSON.stringify(loginData),
            });
            
            // get the response data
            const responseData = await response.json();
            
            // check if the response is not ok
            if (response.status != 200) {
                // set error message handler
                setErrorMessages([responseData['error']]);
            }

            return responseData;
        } catch (fetchError) {
            setErrorMessages(["Something went wrong. Could not login. Please try again."]);
            return fetchError;
        }
    }

    
    

}
