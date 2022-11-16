import { hash, genSalt } from "bcrypt";
import { userInfo } from "../database/queries";

async function pass2hash(password) {
    let salt = genSalt(10);
    let hashedpass = hash(password, await salt);
    return hashedpass;
}

async function tokenGen() {
    var tokenChars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789?!#*%;:.";

    var result = "";
    for (let i = 0; i < 30; i++) {
        result += tokenChars[Math.floor(Math.random(0) * tokenChars.length)];
    }

    if (Boolean(await userInfo({ token: result }))) {
        return tokenGen();
    } else {
        return result;
    }
}

export { pass2hash, tokenGen };
