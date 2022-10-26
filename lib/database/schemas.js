import { Schema } from "mongoose";


let messageSchema = Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
})

export {messageSchema}