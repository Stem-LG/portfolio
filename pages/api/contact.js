import { messageExists, saveMessage } from "../../lib/database/queries";
import { emailRegex } from "../../lib/regexPatterns";

//name email subject message

export default async function  Contact(req, res) {
    let messageData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.content,
    };

    if (verifyData(messageData)) {
        // if (true) {
        let exists = await messageExists(messageData);

        if (exists) {
            res.json({ exist: true, invalid: false });
        } else {
            saveMessage(messageData);
            res.json({ exist: false, invalid: false });
        }
    } else {
        res.json({ invalid: true });
    }
};

function verifyData(data) {
    let nameValid = data.name.length > 2 && data.name.length <= 40;
    let emailValid = emailRegex.test(data.email) && data.email.length <= 200;
    let subjectValid = data.subject.length <= 100;
    let messageValid = data.message.length >= 15 && data.message.length <= 500;

    return nameValid && emailValid && subjectValid && messageValid;
}
