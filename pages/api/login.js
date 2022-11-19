import { createToken, userInfo } from "../../lib/database/queries";
import { pass2hash } from "../../lib/tools/encryption";
import { compare } from "bcrypt";
import { verifyLoginData } from "../../lib/tools/verify";

export default async (req, res) => {
    if (verifyLoginData(req.body) !== false) {
        let userData = await userInfo({
            username: req.body.username,
            email: req.body.email,
        });
        if (Boolean(userData)) {
            if (await compare(req.body.password, userData.hashedpass)) {
                let token = createToken(userData.username);
                res.status(200).json({ token: await token });
            } else {
                res.status(403).json({ error: "wrong password" });
            }
        } else {
            res.status(403).json({ error: "user not registered" });
        }
    } else {
        res.status(400).json({ error: "missing data", recieved: req.body });
    }
};
