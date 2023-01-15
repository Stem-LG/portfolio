import {
    Grid,
    useTheme,
    Typography,
    Box,
    Button,
    Card,
    CardActionArea,
    Dialog,
    Paper,
    TextField,
} from "@mui/material";
import TopAppBar from "../../components/appbar";
import DarkModeFab from "../../components/fab";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import Project from "../../components/project";
import { useSession } from "next-auth/react";
import { MdAddCircle, MdAddCircleOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectSchema } from "../../schema";

export default function Index(props) {
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        fetch("api/getprojects", {
            method: "POST",
            headers: { "Content-type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Head>
                <title>Projects</title>
            </Head>
            <TopAppBar />
            <Grid
                id={props.id}
                container
                minHeight="calc(100vh - 64px)"
                sx={{ bgcolor: theme.palette.background.default }}
                width="100%"
                justifyContent="space-evenly"
                padding={5}
            >
                {loading ? (
                    <Typography color="primary">Loading ...</Typography>
                ) : (
                    projects.map((proj, key) => (
                        <Grid key={key} item mb={5} ml={2} mr={2}>
                            <Project
                                img={proj.image}
                                title={proj.title}
                                desc={proj.description}
                                github={proj.repository}
                                live={proj.live}
                            />
                        </Grid>
                    ))
                )}
                {session.user.role=="admin" ? (
                    <Grid item mb={5} ml={2} mr={2}>
                        <AddCard />
                    </Grid>
                ) : (
                    ""
                )}
            </Grid>
            <DarkModeFab />
        </>
    );
}

function AddCard() {
    const theme = useTheme();

    interface inputType {
        image: string;
        title: string;
        description: string;
        repository: string;
        live: string;
    }
    interface buttonMessageStateType {
        message: string;
        color: "primary" | "error" | "success";
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<inputType>({
        resolver: yupResolver(projectSchema),
    });

    function tempButtonMessage(data: buttonMessageStateType) {
        setButtonMessage(data);
        setTimeout(() => {
            setButtonMessage({
                message: "Add Project",
                color: "primary",
            });
        }, 2000);
    }

    function onSubmit(data: inputType) {
        fetch("/api/addproject", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }).then(({ status, json }) => {
            switch (status) {
                case 200:
                    tempButtonMessage({
                        color: "success",
                        message: "Project Added",
                    });
                    break;
                case 400:
                    json().then((res) => {
                        tempButtonMessage({
                            color: "error",
                            message: res.error,
                        });
                    });
                    break;
                case 401:
                    tempButtonMessage({
                        color: "error",
                        message: "not authenticated",
                    });
                    break;
                case 403:
                    tempButtonMessage({
                        color: "error",
                        message: "not authorized",
                    });
                    break;
                default:
                    tempButtonMessage({
                        color: "error",
                        message: "unknown error",
                    });
                    break;
            }
        });
    }

    const [open, setOpen] = useState(false);
    const [buttonMessage, setButtonMessage] = useState<buttonMessageStateType>({
        color: "primary",
        message: "Add Project",
    });

    return (
        <>
            <Card
                onClick={() => {
                    setOpen(true);
                }}
                sx={{
                    height: { xs: 457, xl: 557 },
                    width: {
                        xs: 320,
                        sm: 330,
                        xl: 380,
                    },
                }}
            >
                <CardActionArea
                    sx={{ height: "100%", width: "100%", textAlign: "center" }}
                >
                    {theme.palette.mode == "dark" ? (
                        <MdAddCircleOutline
                            size={120}
                            color={theme.palette.primary.main}
                        />
                    ) : (
                        <MdAddCircle
                            size={120}
                            color={theme.palette.primary.main}
                        />
                    )}
                </CardActionArea>
            </Card>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <Paper sx={{ p: "1rem 2rem 2rem 2rem" }}>
                    <Typography variant="h1" textAlign="center">
                        Add a project
                    </Typography>
                    <Grid
                        container
                        width="100%"
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        textAlign="center"
                        spacing={3}
                        mt={1}
                    >
                        <Grid item xs={12}>
                            <TextField
                                {...register("title")}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                label={"Title"}
                                variant="outlined"
                                sx={{ width: "70%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                label={"Description"}
                                variant="outlined"
                                sx={{ width: "70%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("repository")}
                                error={!!errors.repository}
                                helperText={errors.repository?.message}
                                label={"Repository Link"}
                                variant="outlined"
                                sx={{ width: "70%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("live")}
                                error={!!errors.live}
                                helperText={errors.live?.message}
                                label={"Live Demo Link"}
                                variant="outlined"
                                sx={{ width: "70%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...register("image")}
                                error={!!errors.image}
                                helperText={errors.image?.message}
                                label={"Image Link"}
                                variant="outlined"
                                sx={{ width: "70%" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                color={buttonMessage.color}
                                sx={{
                                    width: 300,
                                    borderRadius: "10px 0 10px 0",
                                }}
                            >
                                {buttonMessage.message}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Dialog>
        </>
    );
}
