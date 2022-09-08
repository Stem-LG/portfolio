import { useState } from "react";
import { emailRegex } from "../regexPatterns";

function useEmailVerifier(defaultEmail) {
    const [emailValid, setEmailValid] = useState(true);
    const [email, setEmail] = useState(defaultEmail || "");

    function verifyEmail(e) {
        setEmailValid(emailRegex.test(e.target.value) || e.target.value == "");
        if (emailValid) {
            setEmail(e.target.value);
        }
    }

    return [email, emailValid, verifyEmail];
}

function useLengthVerifier(defaultValue, min=0, max=50) {
    const [lengthValid, setLengthValid] = useState(true);
    const [value, setValue] = useState(defaultValue || "");

    function verifyLength(e) {
        setLengthValid(
            (e.target.value.length >= min && e.target.value.length <= max) || e.target.value.length == 0
        );
        if (lengthValid) {
            setValue(e.target.value);
        }
    }

    return [value, lengthValid, verifyLength];
}

export {
    useEmailVerifier,
    useLengthVerifier,
};
