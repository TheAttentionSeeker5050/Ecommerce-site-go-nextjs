// validate phone number function using regex
// return boolean and a string for error message
// it can be in the format of 123-456-7890 or (123) 456-7890 or 1234567890 or 123.456.7890 and also may or may not come with the country code like +1 123-456-7890
export const validatePhone = (phone: string | null | undefined): boolean => {
    const regex = /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    // check if the phone is empty
    if (!phone) {
        return false
    }

    // check if the phone is valid
    if (!regex.test(phone)) {
        return false
    }
    return true
}

// convert phone number to the format of 123-456-7890
// it needs to remove the + country code
export const formatPhone = (phone: string | null | undefined): string => {
    // check if the phone is empty
    if (!phone) {
        return ""
    }

    // remove the + country code
    phone = phone.replace("+", "")

    // remove all non-digit characters
    phone = phone.replace(/\D/g, "")

    // only use the last 10 digits
    phone = phone.substring(phone.length - 10)

    // format the phone number
    phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")

    return phone
}
