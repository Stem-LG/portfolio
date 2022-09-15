import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    useTheme,
} from "@mui/material";
import SectionDivider from "../components/divider";
import { useEmailVerifier, useLengthVerifier } from "../hooks/formvalidation";
import { useState } from "react";

export default function Contact(props) {
    const theme = useTheme();

    const [name, nameValid, verifyName] = useLengthVerifier("", 2, 30);
    const [email, emailValid, verifyEmail] = useEmailVerifier("");
    const [message, messageValid, verifyMessage] = useLengthVerifier(
        "",
        15,
        500
    );
    const [subject, setSubject] = useState("");

    const [sendColor, setSendColor] = useState("primary");
    const [sendText, setSendText] = useState("send");

    let data = {
        name: name,
        email: email,
        subject: subject,
        content: message,
    };

    async function submitMessage() {
        if (
            nameValid &&
            name != "" &&
            emailValid &&
            email != "" &&
            messageValid &&
            message != ""
        ) {
            // let res = await axios.post("/api/message", data);

            console.log(res);
            console.log(data);
            if (false || res.data.exist) {
                setSendColor("error");
                setSendText("not-sent");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSendColor("primary");
                setSendText("send");
            } else {
                setSendColor("success");
                setSendText("sent");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSendColor("primary");
                setSendText("send");
            }
        } else {
            setSendColor("error");
            setSendText("invalid-data");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSendColor("primary");
            setSendText("send");
        }
    }

    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "calc(100vh - 64px)" }}
            sx={{ bgcolor: theme.palette.background.default }}
            id={props.id}
        >
            <SectionDivider title="Contact" sx={{ pt: "64px" }} />
            <Grid container justifyContent="space-evenly">
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : "invalid name"}
                        onBlur={verifyName}
                        label="Name"
                        variant="outlined"
                        sx={{ width: "70%", mt: 7.5 }}
                        inputProps={{ maxLength: 30 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!emailValid}
                        helperText={emailValid ? "" : "invalid email"}
                        onBlur={verifyEmail}
                        label="Email"
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                        required
                        inputProps={{ maxLength: 100 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        label="Subject"
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                        inputProps={{ maxLength: 100 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!messageValid}
                        helperText={
                            messageValid
                                ? ""
                                : "message can't be less than 15 characters"
                        }
                        onBlur={verifyMessage}
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={5}
                        sx={{ width: "70%", mt: 3 }}
                        required
                        inputProps={{ maxLength: 500 }}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    pt={1.5}
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        sx={{ width: 300 }}
                        color={sendColor}
                        onClick={submitMessage}
                    >
                        {sendText}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
