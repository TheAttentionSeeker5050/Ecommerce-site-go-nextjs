// handle user registration from form in app/register/page.tsx

import axios from 'axios';
// require('dotenv').config();
import dotenv from 'dotenv';

// import validator functions
import { validateEmail } from '@/api/validators/validateEmail';
import { validateInputText } from '@/api/validators/validateInputText';
import { formatPhone, validatePhone } from '@/api/validators/validatePhone';

dotenv.config();
// this will handle the register page form using fetch
export const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>,
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
    


    // validate fields
    // if email is not valid
    var emailIsValid, emailError;
    var passwordIsValid, passwordError;
    var anyErrors = false;
    [emailIsValid, emailError] = validateEmail(email);
    [passwordIsValid, passwordError] = validateEmail(password);
    
    // add error messages on top of the previous error messages
    if (emailIsValid === false) {
        setErrorMessages([...errorMessages, emailError]);
        anyErrors = true;
        // return;
    }

    if (password !== password2) {
        setErrorMessages([...errorMessages, 'Passwords do not match!']);
        anyErrors = true;

        // return;
    }

    if (passwordIsValid === false) {
        setErrorMessages([...errorMessages, passwordError]);
        anyErrors = true;
        // return;

    }

    // validate first name
    if (validateInputText(first_name) === false) {
        setErrorMessages([...errorMessages, 'First name is not valid or empty!']);
        anyErrors = true;
        // return;

    }

    // validate last name
    if (validateInputText(last_name) === false) {
        setErrorMessages([...errorMessages, 'Last name is not valid or empty!']);
        anyErrors = true;
        // return;

    }

    // validate middle name
    if (validateInputText(middle_name) === false) {
        setErrorMessages([...errorMessages, 'Middle name is not valid or empty!']);
        anyErrors = true;
        // return;
    }

    // validate phone
    if (validatePhone(phone) === false) {
        setErrorMessages([...errorMessages, 'Phone is not valid or empty!']);
        anyErrors = true;
        // return;
    } else {
        // convert the phone number to a valid one
        var formattedPhone = formatPhone(phone);
        // console.log('FORMATTED PHONE:', formattedPhone);
    }
    
    console.log('ERROR MESSAGES:', errorMessages);
    
    if (errorMessages.length === 0) {
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
    
}

function formatPhoneNumber(phone: string | null | undefined) {
    throw new Error('Function not implemented.');
}
    