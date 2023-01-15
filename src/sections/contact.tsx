import { Box, Grid, Button, TextField, useTheme } from "@mui/material";
import SectionDivider from "../components/divider";
import { useState } from "react";
import { messageSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface inputType {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

export default function Contact(props) {
    const theme = useTheme();

    const [sendColor, setSendColor] = useState("primary");
    const [sendText, setSendText] = useState("send");


    async function tempButtonColor(color: string, message: string) {
        setSendColor(color);
        setSendText(message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSendColor("primary");
        setSendText("send");
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<inputType>({
        resolver: yupResolver(messageSchema),
    });

    async function onSubmit(data: inputType) {
        fetch("/api/sendmessage", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }).then(async ({ status }) => {
            switch (status) {
                case 400:
                    tempButtonColor("error", "invalid data");
                    break;
                case 409:
                    tempButtonColor("error", "already sent");
                    break;
                case 200:
                    tempButtonColor("success", "sent");
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "100vh" }}
            sx={{ bgcolor: theme.palette.background.default }}
            id={props.id}
        >
            <SectionDivider title={"contact"} sx={{ pt: "64px" }} />
            <Grid
                container
                justifyContent="space-evenly"
                sx={{ mt: { xl: 20 } }}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid item xs={12} textAlign="center">
                    <TextField
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        label={"name"}
                        variant="outlined"
                        sx={{ width: "70%", mt: 7.5 }}
                        inputProps={{ maxLength: 40 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        label={"email"}
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        {...register("subject")}
                        error={!!errors.subject}
                        helperText={errors.subject?.message}
                        label={"subject"}
                        variant="outlined"
                        sx={{ width: "70%", mt: 3 }}
                        inputProps={{ maxLength: 100 }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <TextField
                        {...register("message")}
                        error={!!errors.message}
                        helperText={errors.message?.message}
                        label={"message"}
                        variant="outlined"
                        multiline
                        rows={5}
                        sx={{ width: "70%", mt: 3 }}
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
                        //@ts-ignore
                        color={sendColor}
                        type="submit"
                    >
                        {sendText}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
