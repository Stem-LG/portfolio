import { messageModel, projectModel } from "./models";
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
    let foundMessage =
        (await messageModel
            .find({ name: data.name })
            .find({ email: data.email })
            .find({ subject: data.subject })
            .findOne({ message: data.message })) || false;
    return foundMessage ? true : false;
}


async function getProjects(quantity) {
    await connectMongo();
    let foundProjects = projectModel.find().sort({priority:1}).limit(quantity);
    return foundProjects;
}


export {
    saveMessage,
    messageExists,
    getProjects,
};
