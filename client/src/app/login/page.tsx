'use client';

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


import { handleLogin } from "@/api/handlers/handleLogin";


// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { SubmitButtonPrimary } from "@/components/buttons/buttonPrimary";

// utils
import { getGitHubOAuthURL, getGoogleOAuthURL } from "@/utils/getOAuthURLs";
import { getCurrentPath } from "@/utils/routeUtils";
import { deleteCookie, getCookies, setCookie } from "cookies-next";


export default function LoginPage() {
    // state vars
    const [email, setEmail] = useState<string | null | undefined>(null);
    const [password, setPassword] = useState<string | null | undefined>(null);

    // state for the error messages
    const initialErrorMessages: string[] = [];
    const [errorMessages, setErrorMessages] = useState<string[]>(initialErrorMessages);

    
    // handle login from form in api/handlers/handleLogin.tsx
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // clear the error messages
        setErrorMessages(initialErrorMessages);

        
        // handle the login form here
        await handleLogin(
            e,
            email,
            password,
            setErrorMessages,
            errorMessages,
            ).then((data) => {
                if (!data.error) {
                    // redirect to login success page
                    // delete previous cookies if exist
                    deleteCookie("access_token");
                    deleteCookie("refresh_token");
                    deleteCookie("logged_in");

                    // set cookies
                    setCookie("access_token", data.accessToken, { expires: new Date(Date.now() + (60*60*12*1000)), path: "/" });
                    setCookie("refresh_token", data.refreshToken, { expires: new Date(Date.now() + (60*60*12*1000)), path: "/"});
                    setCookie("logged_in", "true", { expires: new Date(Date.now() + (60*60*12*1000)), path: "/"});

                    redirectToSuccessPage()
                }
            }).catch((error) => {
                console.log("An error happened on hook:\n",error);
        });
    };
    
    const router = useRouter();

    const redirectToSuccessPage = () => {
        // redirect to home page if login is successful
        router.push('/login/success');
    };

    // handle the change of the input
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

    // if we are on dev server use the dev api url or use the remote api url
    const apiURL = process.env.NODE_ENV === 'development' ? process.env.API_URL : process.env.API_URL_REMOTE;
    
    // location of the api
    // let path = getCurrentPath() as string | "/";
    let githubOAuthPath: string = getGitHubOAuthURL("/login/success");
    let googleOAuthPath: string = getGoogleOAuthURL("/login/success");
    
    // print refresh token in cookies
    
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

            <form method="POST" className=" flex flex-col max-w-xl px-3 mx-auto gap-1.5" onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" name="email" autoComplete="email" onChange={handleChange} />
            
                <label htmlFor="password">Password</label>
                <input type="password" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" id="password" name="password" onChange={handleChange} />
            
                <a href="">Forgot Password?</a>
            
                {/* <input type="submit" value="Login" className="bg-primary text-white py-2 px-4 m-2 rounded-full" /> */}
                <SubmitButtonPrimary text="Login" />
            </form> 

            {/* if need to sign up */}
            <div className="flex max-w-xl gap-2 mx-auto  my-5">
                Need an Account? <Link href="/register" className="text-primary-light dark:text-brand-electric"> Sign up here </Link> 
            </div>

            {/* create a sign in with github button */}
            <div className="flex flex-col max-w-xl mx-auto items-center my-5">
                <Link href={githubOAuthPath} className=" py-2 px-8 m-2 bg-gray text-black rounded-full">
                    Sign in with Github
                    <FontAwesomeIcon icon={faGithub} className="mx-2" />
                </Link>
                {/* make a login with google button */}
                <a href={googleOAuthPath} className=" py-2 px-8 m-2 bg-gray text-black rounded-full">
                    Sign in with Google
                    <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                </a>
            </div>

        </div>
    )
}