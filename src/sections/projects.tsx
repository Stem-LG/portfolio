import { Box, useTheme, Dialog, Paper, useMediaQuery, IconButton, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import SectionDivider from "../components/divider";
import Project from "../components/project";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import LoadingButton from "@mui/lab/LoadingButton";
import { MdClose } from "react-icons/md";

export default function Projects(props) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
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
                    projects.slice(0, lg && projects.length >= 8 ? 8 : md && projects.length >= 6 ? 6 : sm && projects.length >= 4 ? 4 : 2).map((project, key) => <Project key={key} {...project} />)
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
            <ProjectsDialog projects={projects} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </Box>
    );
}

function ProjectsDialog({ projects, dialogOpen, setDialogOpen }) {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up("sm"));
    return (
        <Dialog open={dialogOpen} fullScreen={!sm} onClose={() => setDialogOpen(false)} maxWidth="lg" scroll="paper" fullWidth>
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
                My Projects
                <IconButton sx={{ mr: "0.5rem" }} onClick={() => setDialogOpen(false)}>
                    <MdClose />
                </IconButton>
            </DialogTitle>
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
                    {!projects ? <></> : projects.map((project, key) => <Project key={key} full {...project} />)}
                </Box>
            </DialogContent>
        </Dialog>
    );
}
