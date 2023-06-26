'use client';
import { handleRegister } from "@/api/handlers/handleRegister"
export default function RegisterPage() {
    // this will handle the register page form using axios
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // get the form data
        const formData = new FormData(e.currentTarget)

        // create a new user object
        const newUser = {
            username: formData.get('username'),
            email: formData.get('email'),
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            phone: formData.get('phone'),
            middle_name: formData.get('middle_name'),
            password: formData.get('password'),
            password2: formData.get('password2'),
        }

        // handle register handler function
        handleRegister(newUser)
        // console.log(newUser)

        // sanitize the data and validate if errors
        // if errors, display them
        // if no errors, send the data to the server
        // if server returns errors, display them

    }


    return (
        <div id="p-content" className="">
            <h1 className="text-center">Register</h1>

            <form method="post" className=" flex flex-col max-w-xl px-3 mx-auto" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="first_name" />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="last_name" />

                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" name="phone" />

                <label htmlFor="middleName">Middle Name</label>
                <input type="text" id="middleName" name="middle_name" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />

                <label htmlFor="password2">Confirm Password</label>
                <input type="password" id="password2" name="password2" />

                <input type="submit" value="Register" className="bg-primary text-white py-2 px-4 m-2 rounded-full" />
            </form>

        </div>
    )
}