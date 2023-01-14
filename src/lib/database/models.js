import { models,model } from "mongoose";
import { messageSchema,projectSchema } from "./schemas";

let messageModel = models.messages || model("messages",messageSchema)

let projectModel = models.projects || model("projects",projectSchema)


export {messageModel,projectModel}