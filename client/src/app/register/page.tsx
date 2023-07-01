'use client';
import axios from "axios";


import React, {useState} from "react";

import { handleRegister } from "@/api/handlers/handleRegister";


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
    
    // handle user registration from form in api/handlers/handleRegister.tsx
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // handle the register form here
        await handleRegister(
            e,
            // username,
            email,
            first_name,
            last_name,
            phone,
            middle_name,
            password,
            password2,
            setErrorMessages,
            errorMessages,
        );
    };
           

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