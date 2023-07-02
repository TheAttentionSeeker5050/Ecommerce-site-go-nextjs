// email validator function using regex
// return boolean and a string for error message

export const validateEmail = (email: string | null | undefined): [boolean, string] => { 
    const regex = /\S+@\S+\.\S+/;

    // check if the email is empty
    if (!email) {
        return [false, "Email cannot be empty"]
    }

    // check if the email is valid
    if (!regex.test(email)) {
        return [false, "Please enter a valid email address"]
    } 
    return [true, ""]
}
