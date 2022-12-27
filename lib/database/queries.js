import { messageModel, projectModel, userModel } from "./models";
import connectMongo from "./mongodb";
import { pass2hash, tokenGen } from "../tools/encryption";

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

async function addProject(data) {
    await connectMongo();

    try {
        projectModel.create(data);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function getProjects(quantity) {
    await connectMongo();
    let foundProjects = projectModel.find().sort({priority:1}).limit(quantity);
    return foundProjects;
}

async function createToken(username) {
    try {
        let newToken = tokenGen();
        let d = new Date();
        d.setDate(d.getDate() + 30);
        connectMongo();
        let user = await userModel.findOne({ username: username });
        console.log(user);
        user.tokens.push({ token: await newToken, expirydate: d });
        user.save();
        return newToken;
    } catch (e) {
        console.log(e);
        return "can't create token";
    }
}

async function deleteToken(token) {
    await connectMongo();

    let user = await userModel.findOne({ "tokens.token": token });

    user.tokens.splice(
        user.tokens.findIndex((tokenData) => tokenData.token == token),
        1
    );

    user.save();
}

//needs work
async function userInfo({ username = "", email = "", token = "" }) {
    if (username != "" || email != "" || token != "") {
        await connectMongo();

        let user =
            (await userModel.findOne({ username })) ||
            (await userModel.findOne({ email })) ||
            (await userModel.findOne({ "tokens.token": token })) ||
            false;

        //check if expiry date of token used for query and delete if expired
        if (token != "" && user) {
            let expiryDate = new Date(
                await user.tokens.find(
                    (tokenData) => tokenData.token == token
                ).expirydate
            );
            if (new Date() > expiryDate) {
                deleteToken(token);
                return false;
            }
        }

        return user;
    }

    return false;
}

async function createUser(userData) {
    await connectMongo();
    userData.password = pass2hash(userData.password);
    try {
        await userModel.create({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            username: userData.username,
            hashedpass: await userData.password,
            role: "user",
        });
    } catch (e) {
        console.log(e);
    }
}

export {
    saveMessage,
    createToken,
    userInfo,
    messageExists,
    addProject,
    getProjects,
    createUser,
    deleteToken,
};
