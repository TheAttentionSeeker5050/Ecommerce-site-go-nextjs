// handle user registration from form in app/register/page.tsx

import axios from 'axios';
// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();
// this will handle the register page form using fetch
    export const handleRegister = async (
        e: React.FormEvent<HTMLFormElement>,
        // username: string | null | undefined,
        email: string | null | undefined,
        first_name: string | null | undefined,
        last_name: string | null | undefined,
        phone: string | null | undefined,
        middle_name: string | null | undefined,
        password: string | null | undefined,
        password2: string | null | undefined,
        setErrorMessages: React.Dispatch<React.SetStateAction<string[]>>,
        errorMessages: string[],
        ): Promise<void> => {
            e.preventDefault();
        // handle the register form here


        try {
            // encode the data to raw json
            const newUserData = {
                // 'username': username,
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'phone': phone,
                'middle_name': middle_name,
                'password': password,
                'password2': password2,
            };


            // create an url request string using environment variables
            const url = `${process.env.API_URL}/user/register`;

            // make a post request using fetch, the new user data var and cors headers
            const response = await fetch('http://127.0.0.1:8081/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(newUserData),
            });

            // get the response data
            const responseData = await response.json();
            console.log('RESPONSE DATA:', responseData);

            // check if the response is ok
            if (response.ok) {
                // do something afer the user is created

                // window.location.replace('/login');
                alert('User created successfully!');
            } else {
                // do something if the response is not ok
                // alert('Something went wrong!');
                setErrorMessages([...errorMessages, responseData['error']]);
            }
        } catch (err) {
            
            setErrorMessages([...errorMessages, "Something went wrong!"]);
        }
        
    }

    