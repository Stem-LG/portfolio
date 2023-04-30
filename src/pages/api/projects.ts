import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { projectSchema, projectSubmitSchema, projectsRequestSchema } from "../../schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { ProjectType } from "../../types/types";

const prisma = new PrismaClient()


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


                res.status(200).json(body)

                const parsedBody = JSON.parse(body)
                console.log("body: ", parsedBody)


                if (!session) {
                    //send nothing just 401 status
                    res.status(401).json({ error: "Access Denied. Not authenticated" })
                } else if (session.user.role == "admin") {



                    await projectSchema.validate(parsedBody)

                    await addProject(parsedBody)

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


    let { tech } = p

    console.log("tech: ", tech)
    //@ts-ignore
    p.tech = tech ? tech.map((t) => { return { id: parseInt(t) } }) : []
    console.log("tech: ", tech)



    const data = {
        title: p.title,
        description: p.description,
        image: p.image,

        repository: p.repository,
        link: p.link,
        type: p.type,
    }


    const res = await prisma.project.create({
        data

    })

    console.log("res: ", res)
}



async function getProjects(quantity: number) {


    const projects = await prisma.project.findMany({
        orderBy: [
            {
                priority: "desc",
            }, {
                id: "desc"
            }
        ],
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


    console.log("project0: ", projects[0])

    return projects

}