'use client';
import axios from "axios";


import React, { useState } from "react";

import { handleRegister } from "@/api/handlers/handleRegister";
import { handleLogin } from "@/api/handlers/handleLogin";


// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";



export default function LoginPage() {
    // state vars
    const [email, setEmail] = useState<string | null | undefined>(null);
    const [password, setPassword] = useState<string | null | undefined>(null);

    // state for the error messages
    const initialErrorMessages: string[] = [];
    const [errorMessages, setErrorMessages] = useState<string[]>(initialErrorMessages);

    // handle login from form in api/handlers/handleLogin.tsx
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // clear the error messages
        setErrorMessages(initialErrorMessages);

        // handle the login form here
        handleLogin(
            e,
            email,
            password,
            setErrorMessages,
            errorMessages,
        );

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // change the state of the input
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    };

    return (
        <div id="p-content" className="">
            <h1 className="text-center">Register</h1>

            {errorMessages.length > 0 ? (

            <div className=" max-w-xl mx-auto my-5 text-white bg-danger rounded-lg" role="alert" 
            // hidden
            >
                <ul className="list-disc p-2 mx-4 my-1">
                    {errorMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
            )
            : null}

            <form method="POST" className=" flex flex-col max-w-xl px-3 mx-auto" onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" autoComplete="email" onChange={handleChange} />
            
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} />
            
                
            
                <input type="submit" value="Login" className="bg-primary text-white py-2 px-4 m-2 rounded-full" />
                
            </form> 
            
            {/* create a sign in with github button */}
            <div className="flex flex-col max-w-xl mx-auto items-center my-5">
                <a href={`${process.env.API_URL}/user/auth/github`} className=" py-2 px-4 m-2 rounded-full ">
                    Sign in with Github
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                {/* make a login with google button */}
                <a href={`${process.env.API_URL}/user/auth/google`} className=" py-2 px-4 m-2  rounded-full">
                    Sign in with Google (not inmplemented yet)
                    <FontAwesomeIcon icon={faGoogle} />
                </a>
            </div>


        </div>
    )
}