import {
    Box,
    useTheme,
    Dialog,
    Paper,
    useMediaQuery,
    IconButton,
    DialogTitle,
    DialogContent,
    Collapse,
    ButtonBase,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Popover,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import SectionDivider from "../components/divider";
import Project from "../components/project";
import { useState, useEffect } from "react";
import type { MouseEvent } from "react";
import Tilt from "react-parallax-tilt";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    MdAdd,
    MdClear,
    MdClose,
    MdDone,
    MdOutlineAddPhotoAlternate,
    MdRemove,
} from "react-icons/md";
import Scrollbars from "react-custom-scrollbars-2";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { projectSubmitSchema } from "../schema";
import { useSession } from "next-auth/react";

export default function Projects(props) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const theme = useTheme();

    const sm = useMediaQuery("@media (min-width:770px)");
    const md = useMediaQuery("@media (min-width:1300px)");
    const lg = useMediaQuery("@media (min-width:1728px)");

    useEffect(() => {
        fetch("api/projects", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
                console.log("projects: ", data.projects);
                setLoading(false);
            });
    }, []);

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px) ",
            }}
            id={props.id}
        >
            <SectionDivider title={"Projects"} sx={{ pt: "64px" }} />

            <Box
                sx={{
                    my: "1rem",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {!projects ? (
                    <></>
                ) : (
                    projects
                        .slice(
                            0,
                            lg && projects.length >= 8
                                ? 8
                                : md && projects.length >= 6
                                ? 6
                                : sm && projects.length >= 4
                                ? 4
                                : 2
                        )
                        .map((project, key) => (
                            <Project key={key} {...project} />
                        ))
                )}
            </Box>
            {/* to be changed */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Tilt scale={1.06} tiltMaxAngleX={15} tiltMaxAngleY={15}>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Loading..."
                        variant="contained"
                        sx={{
                            height: "2.5rem",
                            width: "8rem",
                            borderRadius: "1rem 0",
                        }}
                        onClick={() => setDialogOpen(!dialogOpen)}
                    >
                        See More
                    </LoadingButton>
                </Tilt>
            </Box>
            <ProjectsDialog
                projects={projects}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </Box>
    );
}

function ProjectsDialog({ projects, dialogOpen, setDialogOpen }) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up("sm"));
    // const [addPanelOpen, setAddPanelOpen] = useState(false);
    const [addPanelOpen, setAddPanelOpen] = useState(false);

    const { data, status } = useSession();

    return (
        <Dialog
            open={dialogOpen}
            // open={true} //dev only
            fullScreen={!sm}
            onClose={() => setDialogOpen(false)}
            maxWidth="lg"
            scroll="paper"
            fullWidth
        >
            <DialogTitle
                sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: "0.35rem",
                    pr: "0.35rem",
                }}
            >
                <Typography variant="h5" sx={{ width: "8rem" }}>
                    My Projects
                </Typography>
                {status == "authenticated" && data.user.role == "admin" ? (
                    <IconButton
                        sx={{ mr: "0.5rem" }}
                        onClick={() => setAddPanelOpen(!addPanelOpen)}
                    >
                        {addPanelOpen ? <MdRemove /> : <MdAdd />}
                    </IconButton>
                ) : (
                    <></>
                )}
                <IconButton
                    sx={{
                        mr: "0.5rem",
                        width: "2.5rem",
                        height: "2.5rem",
                        ml: "5rem",
                    }}
                    onClick={() => setDialogOpen(false)}
                >
                    <MdClose />
                </IconButton>
            </DialogTitle>
            <Scrollbars
                renderThumbVertical={() => (
                    <div
                        style={{
                            width: "0.5rem",
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: "0.5rem",
                        }}
                    />
                )}
                style={{
                    height: "100svh",
                    width: "100%",
                    // display: addPanelOpen ? "none" : "block",
                }}
            >
                {status == "authenticated" && data.user.role == "admin" ? (
                    <Collapse
                        in={addPanelOpen}
                        sx={{
                            mt: "3rem",
                        }}
                        // in={true} // dev only
                    >
                        <ProjectAdd />
                    </Collapse>
                ) : (
                    <></>
                )}
                <DialogContent sx={{ pb: 0, px: 0 }}>
                    <Box
                        sx={{
                            display: { xs: "block", sm: "flex" },
                            justifyContent: "center",
                            flexWrap: "wrap",
                            overflowY: "clip",
                            pb: "3rem",
                        }}
                    >
                        {!projects ? (
                            <></>
                        ) : (
                            projects.map((project, key) => (
                                <Project key={key} full {...project} />
                            ))
                        )}
                    </Box>
                </DialogContent>
            </Scrollbars>
        </Dialog>
    );
}

function ProjectAdd() {
    const [tech, setTech] = useState([]);
    const [techSelectAnchor, setTechSelectAnchor] =
        useState<HTMLButtonElement | null>(null);

    function openTechSelect(e: MouseEvent<HTMLButtonElement>) {
        setTechSelectAnchor(e.currentTarget);
    }

    useEffect(() => {
        fetch("api/technologies", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((tech) => setTech(tech));
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        clearErrors,
    } = useForm({ resolver: yupResolver(projectSubmitSchema) });

    const selectedTechs = watch("tech");
    const selectedImage = watch("image");
    console.log("selectedimage", selectedImage);
    async function submitAction(e) {
        console.log("submitting: ", e);

        const key = await fetch("/api/imgbbkey", {
            method: "GET",
        }).then(async (res) => {
            return {
                status: res.status,
                key: await res.json().then((data) => data.key),
            };
        });

        if (key.status == 200) {
            const imageURL = await upload2Imgbb(e.image[0], key.key);
            console.log("e: ", e);
            fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify({ ...e, image: imageURL }),
            }).then((res) => console.log("done: ", res));
        } else {
            console.error("error fetching imgbb key, code: ", key.status);
        }
    }

    return (
        <Box
            sx={{
                width: "auto",
                maxWidth: "52rem",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                mx: { xs: "1rem", md: "auto" },
                pb: "1rem",
            }}
            component="form"
            onSubmit={handleSubmit(submitAction)}
        >
            <ButtonBase
                sx={{
                    height: "15rem",
                    width: "15rem",
                    bgcolor: "grey",
                    borderRadius: "1rem",
                }}
                component="label"
            >
                {/* {selectedImage.length != 0 ? "hello" : "bye"} */}
                {selectedImage && selectedImage.length != 0 ? (
                    <Image
                        src={
                            selectedImage
                                ? URL.createObjectURL(selectedImage[0])
                                : ""
                        }
                        width={1024}
                        height={1024}
                        style={{
                            height: "100%",
                            borderRadius: "1rem",
                            objectFit: "cover",
                        }}
                        alt=""
                    />
                ) : (
                    <MdOutlineAddPhotoAlternate color="white" size="2rem" />
                )}
                <input
                    hidden
                    {...register("image")}
                    accept="image/*"
                    type="file"
                />
            </ButtonBase>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "15rem",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <TextField
                        label="Title"
                        {...register("title")}
                        size="small"
                        error={!!errors.title}
                        helperText={errors.title?.message.toString()}
                    />
                    <FormControl sx={{ flex: 1 }} size="small">
                        <InputLabel>Type</InputLabel>
                        <Select
                            defaultValue="app"
                            label="Type"
                            {...register("type")}
                        >
                            <MenuItem value="app">App</MenuItem>
                            <MenuItem value="Design">Design</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    label="Description"
                    {...register("description")}
                    multiline
                    rows={2.5}
                    size="small"
                    error={!!errors.description}
                    helperText={errors.description?.message.toString()}
                />
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <TextField
                        label="Repository"
                        {...register("repository")}
                        size="small"
                        error={!!errors.repository}
                        helperText={errors.repository?.message.toString()}
                    />
                    <TextField
                        label="Link"
                        {...register("link")}
                        size="small"
                        error={!!errors.link}
                        helperText={errors.link?.message.toString()}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "1rem",
                        width: "100%",
                        "& div": {
                            display: "flex",
                            gap: "1rem",
                        },
                    }}
                >
                    <Scrollbars autoHide style={{ borderRadius: "0.25rem" }}>
                        {selectedTechs &&
                            selectedTechs.map((t, key) => (
                                <Box
                                    key={key}
                                    sx={{
                                        px: "1rem",
                                        height: "2.5rem",
                                        bgcolor: "primary.main",
                                        display: "flex",
                                        alignItems: "center",
                                        borderRadius: "0.25rem",
                                    }}
                                >
                                    {tech.find((h) => h.id == t).name}
                                </Box>
                            ))}
                    </Scrollbars>
                    <IconButton onClick={openTechSelect}>
                        <MdAdd />
                    </IconButton>
                    <Popover
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        open={!!techSelectAnchor}
                        anchorEl={techSelectAnchor}
                        onClose={() => setTechSelectAnchor(null)}
                    >
                        <Box
                            sx={{
                                width: "10rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            {tech.map((tech, key) => (
                                <FormControlLabel
                                    key={key}
                                    control={
                                        <Checkbox
                                            name="tech"
                                            value={tech.id}
                                            {...register("tech")}
                                            checked={
                                                selectedTechs &&
                                                selectedTechs.includes(
                                                    tech.id.toString()
                                                )
                                            }
                                        />
                                    }
                                    label={tech.name}
                                    sx={{ ml: "1rem" }}
                                />
                            ))}
                        </Box>
                    </Popover>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    // height: "15rem",
                    flexDirection: { md: "column" },
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                <ButtonBase
                    sx={{
                        height: { xs: "3.5rem", md: "5rem" },
                        width: { xs: "9rem", md: "4rem" },
                        bgcolor: "success.main",
                        borderRadius: "1rem",
                    }}
                    type="submit"
                >
                    <MdDone size="2rem" />
                </ButtonBase>
                <ButtonBase
                    sx={{
                        height: { xs: "3.5rem", md: "5rem" },
                        width: { xs: "9rem", md: "4rem" },
                        bgcolor: "error.main",
                        borderRadius: "1rem",
                    }}
                    // type="reset"
                    onClick={() => {
                        clearErrors()
                    }}
                >
                    <MdClear size="2rem" />
                </ButtonBase>
            </Box>
        </Box>
    );
}

async function upload2Imgbb(file: File, IMGBB_KEY: string) {
    const formData = new FormData();

    formData.append("image", file);

    const url = fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((res) => res.data.url);

    return await url;
}
