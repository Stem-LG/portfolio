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
import { useTranslation } from "next-i18next";
import axios from "axios";

export default function Contact(props) {
    const theme = useTheme();
    const { t } = useTranslation("contact");

    const [name, nameValid, verifyName] = useLengthVerifier("", 3, 40);
    const [email, emailValid, verifyEmail] = useEmailVerifier("");
    const [subject, subjectValid, verifySubject] = useLengthVerifier(
        "",
        0,
        100
    );
    const [message, messageValid, verifyMessage] = useLengthVerifier(
        "",
        15,
        500
    );

    const [sendColor, setSendColor] = useState("primary");
    const [sendText, setSendText] = useState(t("send"));

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
            let res = await axios.post("/api/contact", data);
            
            if (res.data.invalid) {
                setSendColor("error");
                setSendText(t("invalid-data"));
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSendColor("primary");
                setSendText(t("send"));
            } else if (res.data.exist) {
                setSendColor("error");
                setSendText(t("already-sent"));
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSendColor("primary");
                setSendText(t("send"));
            } else {
                setSendColor("success");
                setSendText(t("sent"));
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setSendColor("primary");
                setSendText(t("send"));
            }
        } else {
            setSendColor("error");
            setSendText(t("invalid-data"));
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setSendColor("primary");
            setSendText(t("send"));
        }
    }

    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "100vh" }}
            sx={{ bgcolor: theme.palette.background.default }}
            id={props.id}
        >
            <SectionDivider title={t("contact")} sx={{ pt: "64px" }} />
            <Grid container justifyContent="space-evenly">
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!nameValid}
                        helperText={nameValid ? "" : t("invalid-name")}
                        onBlur={verifyName}
                        label={t("contact-name")}
                        variant="outlined"
                        sx={{ width: "70%", mt: 7.5 }}
                        inputProps={{ maxLength: 40 }}
                        required
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!emailValid}
                        helperText={emailValid ? "" : t("invalid-email")}
                        onBlur={verifyEmail}
                        label={t("contact-email")}
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                        required
                        inputProps={{ maxLength: 200 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!subjectValid}
                        helperText={subjectValid ? "" : t("subject-invalid")}
                        onBlur={verifySubject}
                        label={t("contact-subject")}
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                        inputProps={{ maxLength: 100 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        error={!messageValid}
                        helperText={messageValid ? "" : t("invalid-message")}
                        onBlur={verifyMessage}
                        label={t("contact-message")}
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
                        sx={{ width: 300, borderRadius: "10px 0 10px 0" }}
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
