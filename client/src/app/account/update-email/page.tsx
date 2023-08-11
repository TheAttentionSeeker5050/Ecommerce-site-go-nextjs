"use client";
import { handleChangeEmail } from "@/functions/handlers/editAccountDataRequests";
import { validateEmail } from "@/functions/validators/validateEmail";
import { SubmitButtonPrimary } from "@/components/buttons/buttonPrimary";
import { useState } from "react";

export default function AccountUpdateEmailPage() {

    // const initialErrorMessages: string[] = ["hello", "world"];
    const initialErrorMessages: string[] = [];

    // the state variables
    const [email, setEmail] = useState<string>("");
    const [oldEmail, setOldEmail] = useState<string>("your@old.email");
    const [errorMessages, setErrorMessages] = useState<string[]>(initialErrorMessages);
    const [successMessage, setSuccessMessage] = useState<string>("");

    // handler for submit button
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // clear the error messages
        setErrorMessages(initialErrorMessages);

        // validate email entry using our validateEmail function
        const [emailIsValid, emailErrorMessage] = validateEmail(email);

        // if the email is not valid, add the error message to the error messages array
        if (!emailIsValid) {
            setErrorMessages((errorMessages) => [...errorMessages, emailErrorMessage]);
            return;
        } else {
            console.log("email is valid according to the validator");
        }


        // if the email is valid, send the email request to the backend using a handler function
        await handleChangeEmail("/user/account/change-email", email)
        // await handleChangeEmail("/users/account/change-email", email)
            .then((data) => {
                if (!data.error) {
                    // if the email change was successful, display a success message
                    setSuccessMessage("Email successfully changed");
                } else {
                    // if the email change was not successful, display the error message
                    setErrorMessages((errorMessages) => [...errorMessages, data.error]);
                }
                console.log(data);
            })
            .catch((error) => {
                // if the email change was not successful, display the error message
                setErrorMessages((errorMessages) => [...errorMessages, `Some other catch: ${error.message}`]);
                
                console.log(error);
            });

    };

    // handler for input change
    const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // change the state of the input
        setEmail(e.target.value);
    };


    // render the page
    return (
        <div id="p-content" className="px-3 flex flex-col">
            <h1 className="text-center  text-2xl font-bold my-5 ">Update your account's email</h1>
            
            {/* only display errors if the errors array is not empty */}
            {errorMessages.length > 0 ? (

                <div className=" max-w-xl mx-auto my-5 w-full text-white bg-danger rounded-lg" role="alert" 
                // hidden
                >
                    <ul className="list-disc p-2 mx-4 my-1">
                        {errorMessages.map((message, index) => (
                            <li key={index}>{message}</li>
                        ))}
                    </ul>
                </div>
                )
            : successMessage.length > 0 ? (
                <div className=" max-w-xl mx-auto my-5 w-full text-white bg-brand-light rounded-lg" role="alert" 
                // hidden
                >
                    <ul className="list-disc p-2 mx-4 my-1">
                        <li>{successMessage}</li>
                    </ul>
                </div>
            ) :
            
            null}

            <form method="POST" className=" flex flex-col max-w-xl w-full my-3 mx-auto gap-1.5" 
                onSubmit={handleSubmit}>
                <label htmlFor="email">New Email</label>
                <input type="text" id="email" name="email" className="p-1 px-2 text-black rounded-md border-2 border-gray-dark dark:border-white" autoComplete="email" placeholder={oldEmail}
                onChange={handleEmailInputChange} 
                />
                <SubmitButtonPrimary text="Register" />
            </form>


        </div>
    )
}