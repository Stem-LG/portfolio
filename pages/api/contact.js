import client from "../../lib/mongodb";
import { emailRegex } from "../../lib/regexPatterns";

//name email subject message

export default async (req, res) => {
    let db = client.db(process.env.MONGODB_DBNAME);
    let collection = db.collection("Messages");

    let message = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.content,
    };

    if (verifyData(message)) {
        let exist = await collection.findOne(message);

        if (!exist) {
            collection.insertOne(message);
            res.json({ exist: false, invalid: false });
        } else {
            res.json({ exist: true, invalid: false });
        }
    } else {
        res.json({ invalid: true });
    }
};

function verifyData(data) {
    let nameValid = data.name.length > 2 && data.name.length <= 40;
    let emailValid = emailRegex.test(data.email) && data.email.length < 200;
    let subjectValid = data.subject.length <= 100;
    let messageValid = data.message.length >= 15 && data.message.length <= 500;

    return nameValid && emailValid && subjectValid && messageValid;
}
