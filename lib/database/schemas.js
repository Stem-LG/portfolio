import { Schema } from "mongoose";


let messageSchema = Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
})

let projectSchema = Schema({
    priority: Number,
    img: String,
    title: String,
    desc: String,
    github: String,
    live: String
})


let userSchema = Schema({
    username: String,
    email: String,
    hashedpass: String,
    tokens: [{ token: String, expirydate: Date }],
    role: String,
});

export {messageSchema,projectSchema,userSchema}