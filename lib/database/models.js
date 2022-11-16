import { models,model } from "mongoose";
import { userSchema } from "./schemas";
import { messageSchema,projectSchema } from "./schemas";

let messageModel = models.messages || model("messages",messageSchema)

let projectModel = models.projects || model("projects",projectSchema)

let userModel = models.users || model("users",userSchema)

export {messageModel,projectModel, userModel}