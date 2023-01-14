import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { messageSchema } from "../../schema";



export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
    try {
        console.log(body)
        await messageSchema.validate(body)
        const prisma = new PrismaClient()

        if (await prisma.message.findFirst({
            where: body
        })) {
            throw { code: 409, message: "Message already exists" }
        } else if (await prisma.message.create({
            data: body
        })) {
            res.status(200).json({ ok: true })
        } else {
            throw { code: 500, message: "Database Error" }
        }

    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({
                error: err.message
            })
        } else if (!!err.code) {
            res.status(err.code).json({ error: err.message })
        } else {
            res.status(500).json({ error: "Unknown server error" })
        }
        console.log(err)
    }

}