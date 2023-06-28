// handle user registration from form in app/register/page.tsx

import axios from 'axios';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

export function handleRegister(
    newUserData: any
    // {
    //     username: string | null | undefined,
    //     email: string | null | undefined,
    //     first_name: string | null | undefined,
    //     last_name: string | null | undefined,
    //     phone: string | null | undefined,
    //     middle_name: string | null | undefined,
    //     password: string | null | undefined,
    //     password2: string | null | undefined,
    // } 
) { 
    // validate the data
    if (newUserData.password !== newUserData.password2) {
        alert('Passwords do not match');
        return;
    }

    // console.log(process.env.API_URL);
    // get the api route
    const url = process.env.API_URL +'/' + process.env.API_USER_SUBDIR +'/register';
    // console.log('URL:', url);
    // console.log('USER DATA:', newUserData);

    // print the type of newUserData
    console.log(typeof newUserData);
    // send the request
    axios.post(url, {}
    //     , {
    //     username: newUserData.username,
    //     email: newUserData.email,
    //     first_name: newUserData.first_name,
    //     last_name: newUserData.last_name,
    //     phone: newUserData.phone,
    //     middle_name: newUserData.middle_name,
    //     password: newUserData.password,
    // }
    )
    .then((res) => {
        // handle success
        console.log(res);
        alert('Registration successful');
    }
    )
    .catch((err) => {
        // handle error
        console.log('ERROR:', err);
        alert('Registration failed');
    })
}