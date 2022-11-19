import { userInfo } from "../../lib/database/queries";

export default async function UserInfo(req, res) {
    if (Boolean(req.body.token)) {
        let data = await userInfo({ token: req.body.token });
        if (data) {
            res.status(200).json({
                username: data.username,
                email: data.email,
                role: data.role,
            });
        } else {
            res.status(403).json({ error: "invalid token" });
        }
    } else {
        res.status(400).json({ error: "missing data" });
    }
};
