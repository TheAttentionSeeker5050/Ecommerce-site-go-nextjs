"use client";
import { handleGetRequests } from "@/functions/handlers/handleGenericGetRequests";
import { useEffect, useState } from "react";

export default function AccountMainPage() {

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [photoUrl, setPhotoUrl] = useState<string>();
    const [emailNeedsUpdate, setEmailNeedsUpdate] = useState<boolean>(false);

    // some state of the fetched account data
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        // fetch account data using our generic function
        handleGetRequests("/user/account")
        .then((data) => {
            if (data.error) {
                setError(data.error);
                // next here we need to have our open session shut down, in case that it is some kind of authentication error
                // we the server already deleted cookies, but we will to delete the redux store data on open session
            } else {
                // set the state variables
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setEmailNeedsUpdate(data.email_needs_update);
                setPhotoUrl("https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"); // we will use gravatar for now
                setIsLoading(false);

            }
        })
        .catch((error) => {
            console.log(error.status);
        });

    }, []);

    return (
        <div id="p-content" className="py-4">
            {isLoading && <p className="text-center text-3xl">Loading...</p>}
            {error && <p className="text-center text-2xl">{error}</p>}
            {!isLoading && !error && (
                
                <div id="profile-wrapper" className="">
                    <h1 className="text-4xl font-bold text-center py-3">Account</h1>
                    <div className="flex flex-col items-center">
                        <img className="rounded-full w-32 h-32" src={photoUrl} alt="Profile picture" />
                        <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
                        <h3 className="text-xl">{email}</h3>
                    </div>
                </div>
            )}
        </div>
    )
}