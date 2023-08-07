'use client';
import axios from "axios";


import React, {useState} from "react";

import { handleRegister } from "@/api/handlers/handleRegister";
import Link from "next/link";
import { SubmitButtonPrimary } from "@/components/buttons/buttonPrimary";


export default function RegisterPage() {
    
    const [email, setEmail] = useState<string | null | undefined>(null);
    const [first_name, setFirstName] = useState<string | null | undefined>(null);
    const [last_name, setLastName] = useState<string | null | undefined>(null);
    const [phone, setPhone] = useState<string | null | undefined>(null);
    const [middle_name, setMiddleName] = useState<string | null | undefined>(null);
    const [password, setPassword] = useState<string | null | undefined>(null);
    const [password2, setPassword2] = useState<string | null | undefined>(null);

    // state for the error messages
    const initialErrorMessages: string[] = [];
    const [errorMessages, setErrorMessages] = useState<string[]>(initialErrorMessages);
    
    // handle user registration from form in api/handlers/handleRegister.tsx
    const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // clear the error messages
        setErrorMessages(initialErrorMessages);

        // handle the register form here
        handleRegister(
            e,
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
        <div id="p-content" className="px-3">
            <h1 className="text-center  text-2xl font-bold my-5 ">Register</h1>

            {/* only display errors if the errors array is not empty */}
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

            <form method="POST" className=" flex flex-col max-w-xl px-3 mx-auto gap-1.5" onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" autoComplete="email" onChange={handleChange} />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" name="first_name" onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="lastName" name="last_name" onChange={handleChange} />

                <label htmlFor="phone">Phone</label>
                <input type="text" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="phone" name="phone" onChange={handleChange} />

                <label htmlFor="middleName">Middle Name</label>
                <input type="text" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="middleName" name="middle_name" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="password" name="password" onChange={handleChange} />

                <label htmlFor="password2">Confirm Password</label>
                <input type="password" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="password2" name="password2" onChange={handleChange} />

                <SubmitButtonPrimary text="Register" />
                
            </form>

            {/* if you need to register instead */}
            <div className="flex max-w-xl gap-2 mx-auto  my-5">
                Already have an account? <Link href="/register" className="text-primary-light dark:text-brand-electric">Sign In here</Link>
            </div>

        </div>
    )
}