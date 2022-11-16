import { deleteToken, userInfo } from "../../lib/database/queries";

export default async function logout(req, res) {
    if (Boolean(req.body.token)) {
        if (Boolean(await userInfo({token:req.body.token}))) {
            await deleteToken(req.body.token);
            res.status(200).json();
        } else {
            res.status(404).json({ error: "token isn't used" });
        }
    } else {
        res.status(401).json({ error: "no token was sent" });
    }
}
