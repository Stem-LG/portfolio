import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "./auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method } = req

    const prisma = new PrismaClient()


    try {

        switch (method) {
            case "GET":

                const tech = prisma.technologyused.findMany({
                    select:{
                        name: true,
                        id: true
                    }
                })

                res.status(200).json(await tech)


                break;
            default:
                res.status(400).json({ error: "Bad request" })
                break;
        }

    } catch (err) {

        res.status(500).json({ error: "Unknown server error" })
    }
}