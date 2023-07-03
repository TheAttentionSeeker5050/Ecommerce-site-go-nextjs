import { validateEmail } from "@/api/validators/validateEmail";
import { validatePassword } from "@/api/validators/validatePassword";

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
            var url: string;
            if (process.env.NODE_ENV === 'development') {
                url = `${process.env.API_URL}/user/login`;
            } else {
                url = `${process.env.API_URL_REMOTE}/user/login`;
            }
            
            // make a post request using fetch, the new user data var and cors headers
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': 'https://ecommerce-x.alligatorcode.pro',
                    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
                },
                body: JSON.stringify(loginData),
            });
            
            // get the response data
            const responseData = await response.json();
            
            // check if the response is ok
            if (response.ok) {
                // set the token in local storage
                // localStorage.setItem('token', responseData.token);
                // redirect to home page
                // window.location.href = '/';
                // window.location.href = 'https://ecommerce-x.alligatorcode.pro/api/v1/user/auth/callback'
                window.location.href = responseData['callbackURL'];
            } else {
                // set the error messages
                setErrorMessages([responseData['error']]);
            }
        
        } catch (fetchError) {
            setErrorMessages(["Something went wrong. Could not login. Please try again."]);
        }
    }

    
    

}
