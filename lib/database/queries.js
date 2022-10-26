import { messageModel } from "./models";
import connectMongo from "./mongodb";

async function saveMessage(data) {
    await connectMongo();
    try {
        messageModel.create({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function messageExists(data) {
    await connectMongo();
    //i's finding a message where only one of the conditions are met - find a fix
    let foundMessage =
        (await messageModel
            .find({ name: data.name })
            .find({ email: data.email })
            .find({ subject: data.subject })
            .findOne({ message: data.message })) || false;
    return foundMessage ? true : false;
}

export { saveMessage, messageExists };
