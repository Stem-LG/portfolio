import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { messageSchema } from "../../schema";
import { MessageType } from "../../types/types";




export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body } = req

    try {

        switch (method) {
            case "GET":
                res.status(404).json({ message: "Not implemented yet!" })
                break;
            case "POST":

                await messageSchema.validate(body)

                const sent = await saveMessage(body)

                if (sent == 0) {
                    res.status(200).json({ ok: true })
                } else if (sent == 1) {
                    res.status(409).json({ error: "Message already exists" })
                } else {
                    res.status(500).json({ error: "Database Error" })
                }

                break;
            case "PUT":
                res.status(404).json({ message: "Not implemented yet!" })
                break;
            case "DELETE":
                res.status(404).json({ message: "Not implemented yet!" })
                break;
            default:
                res.status(400).json({ message: "Bad request" })
                break;
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({
                error: err.message
            })
        } else {
            res.status(500).json({ error: "Unknown server error" })

        }
        console.log(err)
    }
}



async function saveMessage(message: MessageType): Promise<number> {
    const prisma = new PrismaClient()

    if (await prisma.message.findFirst({
        where: message
    })) {
        return 1
        // throw { code: 409, message: "Message already exists" }
    } else if (await prisma.message.create({
        data: message
    })) {
        return 0
    } else {
        return 2
        // throw { code: 500, message: "Database Error" }
    }
}