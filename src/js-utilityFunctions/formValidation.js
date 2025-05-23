function isValidStringInput(input){
    //only contains letters, dashes, apostrophes and whitespaces
    if(input.length > 3){
        const regex = /^[a-zA-Z-' ]*$/g
        const result = regex.test(input)
        return result
    }else{
        return false
    }
}

function isUserEmailAddressValid(userEmailAddress){
    /*check that user email address:*/
    //comprises alphanumeric characters (dot excluded), and is 6 to 20 characters long (e.g. ghxnyab234)
    //followed by the @ symbol
    //followed by another series of alphanumeric characters, with a dot at the end (e.g. google.com or outlook.com)
    const regex = /^[\w-.]{4,30}@([\w-]+.)+[\w-]{2,10}$/g
    const result = regex.test(userEmailAddress)
    //returns a boolean value
    return result
}

export {isValidStringInput, isUserEmailAddressValid}