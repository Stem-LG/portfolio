import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { ValidationError } from "yup";
import { projectSchema } from "../../schema";
import { authOptions } from "./auth/[...nextauth]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req,res,authOptions)
    console.log("seesion: ",session)
    if(!session){
        res.status(401).json({error: "Access Denied. Not authenticated"})
    }else if(session.user.role == "admin"){
        try{
            await projectSchema.validate(req.body)
            const prisma = new PrismaClient()


            await prisma.project.create({
                data: req.body
            })

            res.status(200).json({success: true})
        }catch(err){
            if(err instanceof ValidationError){
                res.status(400).json({error: err.message})
            }
        }
    }else{
        res.status(403).json({error: "Access Denied. Admins only"})
    }
}