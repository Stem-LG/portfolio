import { PrismaClient } from ".prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { MdBloodtype } from "react-icons/md";
import { ValidationError } from "yup";
import { projectsRequestSchema } from "../../schema";



export default async ({ body }: NextApiRequest, res: NextApiResponse) => {
    try {
        
        await projectsRequestSchema.validate(body)
        const prisma = new PrismaClient()
        
        const { quantity } = body


        const projects = await prisma.project.findMany({
            orderBy: {
                priority: "asc"
            },
            take: quantity,
            select: {
                title: true,
                description: true,
                image: true,
                priority: true,
                repository: true,
                live: true
            }
        })
        res.status(200).json({ projects })

    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(400).json({
                error: err.message
            })
        } 
        // else if (!!err.code) {
        //     res.status(err.code).json({ error: err.message })
        // } 
        else {
            res.status(500).json({ error: "Unknown server error" })

        }
        console.log(err)
    }

}