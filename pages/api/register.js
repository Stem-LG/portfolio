import {
    createToken,
    createUser,
    userInfo,
} from "../../lib/database/queries";
import { verifyRegistrationData } from "../../lib/tools/verify";

export default async function register(req, res) {
    let userData = req.body;

    if (await verifyRegistrationData(await userData)) {
        if (
            Boolean(
                await userInfo({
                    username: userData.username,
                    email: userData.email,
                })
            )
        ) {
            res.status(409).json({ error: "user exists" });
        } else {
            await createUser(userData);
            let token = await createToken(userData.username);
            res.status(200).json({ token });
        }
    } else {
        res.status(400).json({ error: "incorrect input" });
    }
}
