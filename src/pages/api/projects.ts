import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { projectSchema, projectsRequestSchema } from "../../schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { ProjectType } from "../../types/types";



export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body } = req

    try {

        switch (method) {
            case "GET":

                await projectsRequestSchema.validate(body)

                const { quantity } = body;

                const projects = await getProjects(quantity)

                res.status(200).json({ projects })

                break;

            case "POST":

                const session = await getServerSession(req, res, authOptions)

                if (!session) {
                    //send nothing just 401 status
                    res.status(401).json({ error: "Access Denied. Not authenticated" })
                } else if (session.user.role == "admin") {

                    await projectSchema.validate(body)

                    await addProject(body)

                    res.status(200)

                } else {
                    res.status(403).json({ error: "Access Denied. Admins only" })
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
        }
        else {
            res.status(500).json({ error: "Unknown server error" })

        }
        console.log(err)
    }
}

//tbd
async function addProject(p: ProjectType) {

    const prisma = new PrismaClient()

    const { tech, ...project} = p




    const newProject = await prisma.project.create({
        data: project
    })

    return newProject

}



async function getProjects(quantity: number) {

    const prisma = new PrismaClient()

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
            link: true,
            tech: true
        }
    })

    return projects

}