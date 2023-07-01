'use client';
import axios from "axios";


import React, {useState} from "react";


export default function RegisterPage() {
    // delcare state variables
    const [username, setUsername] = useState<string | null | undefined>(null);
    const [email, setEmail] = useState<string | null | undefined>(null);
    const [first_name, setFirstName] = useState<string | null | undefined>(null);
    const [last_name, setLastName] = useState<string | null | undefined>(null);
    const [phone, setPhone] = useState<string | null | undefined>(null);
    const [middle_name, setMiddleName] = useState<string | null | undefined>(null);
    const [password, setPassword] = useState<string | null | undefined>(null);
    const [password2, setPassword2] = useState<string | null | undefined>(null);

    // state for the error messages
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    
    
    // this will handle the register page form using fetch
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
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

    

    // handler for input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // change the state of the input
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'first_name':
                setFirstName(e.target.value);
                break;
            case 'last_name':
                setLastName(e.target.value);
                break;
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'middle_name':
                setMiddleName(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'password2':
                setPassword2(e.target.value);
                break;
            default:
                break;
        };
    };

    return (
        <div id="p-content" className="">
            <h1 className="text-center">Register</h1>

            {/* create an alert widget with disable state */}
            <div className="px-3 py-3 max-w-xl mx-auto my-5 text-white bg-danger rounded-lg" role="alert" 
            hidden
            >
                {/* display all error messages usign react list rendering  */}
                <ul>
                    {errorMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>

            <form method="POST" className=" flex flex-col max-w-xl px-3 mx-auto" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" onChange={handleChange} />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="first_name" onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="last_name" onChange={handleChange} />

                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" onChange={handleChange} />

                <label htmlFor="middleName">Middle Name</label>
                <input type="text" id="middleName" name="middle_name" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} />

                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" onChange={handleChange} />

                <input type="submit" value="Register" className="bg-primary text-white py-2 px-4 m-2 rounded-full" />
                
            </form>

        </div>
    )
}