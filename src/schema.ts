import * as yup from "yup"


export const messageSchema = yup.object({
    name: yup
        .string()
        .min(3)
        .max(40)
        .matches(/^[a-zA-Z ]+$/, "Alphabetic letters only")
        .required(),

    email: yup.string().email().required(),
    subject: yup.string().max(100).optional(),
    message: yup.string().min(15).max(500).required(),
})

const projectSharedSchema = {
    title: yup.string().required(),
    description: yup.string().max(70).required(),
    repository: yup.string().url().optional(),
    link: yup.string().url().optional(),
    type: yup.string().required(),
    tech: yup.array().of(yup.string()).optional()
}

export const projectSchema = yup.object({
    image: yup.string().url().required(),
    ...projectSharedSchema
})

export const projectSubmitSchema = yup.object({
    image: yup.mixed()
        .test('fileSelected', 'You must select a file', (value) => value.length != 0
        )
        .test('fileType', 'Only images are allowed', (value) =>
            value.length != 0 && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type)
        )
        .test('fileSize', 'File must be under 32MB', (value) =>
            value.length != 0 && value[0].size <= 32 * 1024 * 1024
        )
        .required('An image is required'),
    ...projectSharedSchema
})

export const certificationSchema = yup.object({
    image: yup.string().url().required(),
    title: yup.string().required(),
    description: yup.string().max(70).required(),
    issuer: yup.string().required(),
    date: yup.date().required(),
    expiry: yup.date().required(),
    link: yup.string().url().optional(),
    presential: yup.boolean().required()
})


export const projectsRequestSchema = yup.object({
    quantity: yup.number().min(1).optional()
})
export const certificationsRequestSchema = yup.object({
    quantity: yup.number().min(1).optional()
})