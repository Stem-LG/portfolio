import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";
import { certificationSchema, certificationsRequestSchema } from "../../schema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { CertificationType } from "../../types/types";



export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { method, body } = req

    try {

        switch (method) {
            case "GET":

                await certificationsRequestSchema.validate(body)

                const { quantity } = body;

                const certifications = await getCertifications(quantity)

                res.status(200).json({ certifications })

                break;

            case "POST":

                const session = await getServerSession(req, res, authOptions)

                if (!session) {
                    //send nothing just 401 status
                    res.status(401).json({ error: "Access Denied. Not authenticated" })
                } else if (session.user.role == "admin") {

                    await certificationSchema.validate(body)

                    await addCertification(body)

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



async function addCertification(certification: CertificationType) {

    const prisma = new PrismaClient()

    const newCertification = await prisma.certification.create({
        data: certification
    })

    return newCertification

}



async function getCertifications(quantity: number) {

    const prisma = new PrismaClient()

    // const certifications = await prisma.certification.findMany({
    //     orderBy: {
    //         priority: "asc"
    //     },
    //     take: quantity,
    //     select: {
    //         priority: true,
    //         image: true,
    //         title: true,
    //         description: true,
    //         issuer: true,
    //         date: true,
    //         expiry: true,
    //         link: true,
    //         presential: true
    //     }
    // })

    const certifications = [
        {
            priority: 1,
            image: "/assets/images/Coursera-Logo.png",
            title: "Machine Learning Specialization",
            description: "",
            issuer: "Coursera | DeepLearning.ai, Stanford",
            date: "2023-05-21 00:00:00.000",
            expiry: "",
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/N5RFXEPYE4GX",
            presential: false
        }, {
            priority: 2,
            image: "/assets/images/Coursera-Logo.png",
            title: "Google IT Support Specialization",
            description: "",
            issuer: "Coursera | Google",
            date: "2023-01-04 01:25:00.000",
            expiry: "",
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/NR94EGMGGGSL",
            presential: false
        }, {
            priority: 3,
            image: "/assets/images/Coursera-Logo.png",
            title: "Google IT Automation with Python",
            description: "",
            issuer: "Coursera | Google",
            date: "2023-02-01 22:21:00.000",
            expiry: "",
            link: "https://www.coursera.org/account/accomplishments/specialization/certificate/TCZET7PLYLFL",
            presential: false
        },
    ]

    return certifications

}