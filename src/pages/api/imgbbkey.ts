import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method } = req

    try {

        switch (method) {
            case "GET":
                const session = await getServerSession(req, res, authOptions)

                if (!session) {
                    res.status(401).json({ error: "Access Denied. Not authenticated" })
                } else if (session.user.role == "admin") {

                    const key = process.env.IMGBB_KEY

                    res.status(200).json({key})

                } else {
                    res.status(403).json({ error: "Access Denied. Admins only" })
                }

                break;
            default:
                res.status(400).json({ error: "Bad request" })
                break;
        }

    } catch (err) {

        res.status(500).json({ error: "Unknown server error" })
    }
}