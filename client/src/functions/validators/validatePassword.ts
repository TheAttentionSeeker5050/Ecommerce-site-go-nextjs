// password validator function using regex
// return boolean and a string for error message
// a valid password must be between 8 and 32 characters long
// contain at least one uppercase letter, one lowercase letter, and one number
export const validatePassword = (password: string | null | undefined): [boolean, string] => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;

    // check if the password is empty
    if (!password) {
        return [false, "Password cannot be empty"]
    }

    // check if the password is valid
    if (!regex.test(password)) {
        return [false, "Password must be between 8 and 32 characters long, contain at least one uppercase letter, one lowercase letter, and one number"]
    }
    return [true, ""]
}