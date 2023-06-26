// handle user registration from form in app/register/page.tsx

import axios from 'axios';
require('dotenv').config();

export function handleRegister(
    newUserData: {
        username: string,
        email: string,
        first_name: string,
        last_name: string,
        phone: string,
        middle_name: string,
        password: string,
        password2: string,
    }
) { 
    // validate the data
    if (newUserData.password !== newUserData.password2) {
        alert('Passwords do not match');
        return;
    }

    console.log(process.env.API_URL)
    // get the api route
    const url = process.env.API_URL +'/user/register';

    // send the request
    axios.post(url, {
        username: newUserData.username,
        email: newUserData.email,
        first_name: newUserData.first_name,
        last_name: newUserData.last_name,
        phone: newUserData.phone,
        middle_name: newUserData.middle_name,
        password: newUserData.password,
    })
    .then((res) => {
        // handle success
        console.log(res);
        alert('Registration successful');
    }
    )
    .catch((err) => {
        // handle error
        console.log(err);
        alert('Registration failed');
    })
}