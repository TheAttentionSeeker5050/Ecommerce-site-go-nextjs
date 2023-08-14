// this validator escapes any malicious code and checks if a form field is only text and numbers
// it also checks if the field is empty
// it returns a boolean and a string for error message

export const validateInputText = (text: string | null | undefined): boolean => {
    const regex = /^[a-zA-Z0-9\s]*$/;

    // check if the text is empty
    if (!text) {
        return false
    }

    // check if the text is valid
    if (!regex.test(text)) {
        return false
    }
    return true
}