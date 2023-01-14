import * as yup from "yup"


export const messageSchema = yup.object({
    name: yup
        .string()
        .min(3)
        .max(40)
        .matches(/^[a-zA-Z]+$/, "Alphabetic letters only")
        .required(),

    email: yup.string().email().required(),
    subject: yup.string().max(100).optional(),
    message: yup.string().min(15).max(500).required(),
})


export const projectSchema = yup.object({
    image: yup.string().url().required(),
    title: yup.string().required(),
    description: yup.string().required(),
    repository: yup.string().url().optional(),
    live: yup.string().url().optional()
})


export const projectsRequestSchema = yup.object({
    quantity: yup.number().min(1).required()
})