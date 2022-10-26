import { models,model } from "mongoose";
import { messageSchema } from "./schemas";

let messageModel = models.messages || model("messages",messageSchema)

export {messageModel}