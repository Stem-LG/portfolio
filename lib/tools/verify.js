import { emailRegex } from "../regexpatterns";
function verifyFullName(first, last) {
    return first != "" && last != "";
}

function verifyUserName(username) {
    return /^[a-zA-Z0-9]/.test(username) && username.length >= 4;
}

function verifyEmail(email) {
    return emailRegex.test(email);
}

function verifyPassword(password) {
    return password.length >= 8;
}

async function verifyRegistrationData(data) {
    if(!verifyFullName(data.firstname,data.lastname)){
        return "name error"
    }else if(!verifyUserName(data.username)){
        return "username error"
    }else if(!verifyEmail(data.email)){
        return "email error"
    }else if(!verifyPassword(data.password)){
        return "password error"
    }else{
        return true;
    }
    
}

function verifyLoginData(data) {
    return (Boolean(data.username)||Boolean(data.email)) && Boolean(data.password)
}

export { verifyRegistrationData, verifyLoginData };
