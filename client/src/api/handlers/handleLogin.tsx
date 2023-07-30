import { validateEmail } from "@/api/validators/validateEmail";
import { validatePassword } from "@/api/validators/validatePassword";
import { useRouter } from "next/navigation";

// login request handler with input validation and fetch request
export const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string | null | undefined,
    password: string | null | undefined,
    setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
    errorMessages: string[],
    ): Promise<void> => {
    
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
            
            // create an url request string using environment variables
            // declare the url variable as string
            let apiURL: string;
            if (process.env.NODE_ENV === 'development') {
                apiURL = `${process.env.API_URL}/user/login`;
            } else {
                apiURL = `${process.env.API_URL_REMOTE}/user/login`;
            }
            
            // create a control origin header based on environment type
            var controlOrigin: string;
            if (process.env.NODE_ENV === 'development') {
                controlOrigin = process.env.CLIENT_URL as string;
            } else {
                controlOrigin = process.env.CLIENT_URL_REMOTE as string;
            }

            // make a post request using fetch, the new user data var and cors headers
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': controlOrigin,
                },
                body: JSON.stringify(loginData),
            });
            
            // get the response data
            const responseData = await response.json();
            // return responseData;
            
            // check if the response is ok
            if (response.status != 200) {
                // set the token in local storage
                setErrorMessages([responseData['error']]);
                console.log(responseData['errorType']);
            } else {
                // redirect to the home page
                console.log(responseData);
                const Router = useRouter();
                await Router.push(`${controlOrigin}/`);
            }
        } catch (fetchError) {
            setErrorMessages(["Something went wrong. Could not login. Please try again."]);
        }
    }

    
    

}
