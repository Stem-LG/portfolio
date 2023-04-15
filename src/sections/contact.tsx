import { Box, Grid, Button, TextField, useTheme } from "@mui/material";
import SectionDivider from "../components/divider";
import { useState } from "react";
import { messageSchema } from "../schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Tilt from "react-parallax-tilt";

interface inputType {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

//create a type of a string variable that can only be "primary" or "secondary"
type submitColorType = "primary" | "error" | "success";

export default function Contact(props) {
    const theme = useTheme();

    const [sendColor, setSendColor] = useState<submitColorType>("primary");
    const [sendText, setSendText] = useState("send");

    async function tempButtonColor(color: submitColorType, message: string) {
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
        fetch("/api/messages", {
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
        <Box minHeight="100vh" id={props.id}>
            <SectionDivider title={"contact"} sx={{ pt: "64px" }} />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    pt: "5rem",
                    //center this box
                    width: "70%",
                    margin: "auto",
                }}
            >
                <TextField
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    label={"Name"}
                    variant="outlined"
                    inputProps={{ maxLength: 40 }}
                    fullWidth
                />
                <TextField
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    label={"Email"}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    {...register("subject")}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    label={"Subject"}
                    variant="outlined"
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                />
                <TextField
                    {...register("message")}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    label={"Message"}
                    variant="outlined"
                    multiline
                    rows={5}
                    inputProps={{ maxLength: 500 }}
                    fullWidth
                />
                <Tilt
                    scale={1.06}
                    tiltMaxAngleX={7}
                    tiltMaxAngleY={7}
                >
                    <Button
                        variant="contained"
                        sx={{ width: "12rem", borderRadius: "10px 0 10px 0" }}
                        color={sendColor}
                        type="submit"
                    >
                        {sendText}
                    </Button>
                </Tilt>
            </Box>
        </Box>
    );
}
