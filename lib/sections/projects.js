import { Box, useTheme, Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import SectionDivider from "../components/divider";
import Project from "../components/project";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Projects(props) {
    const { t } = useTranslation("projects");
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("api/projects", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ quantity: 4 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            });
    }, []);

    const theme = useTheme();
    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "100vh" }}
            id={props.id}
            sx={{ bgcolor: theme.palette.background.default }}
        >
            <SectionDivider title={t("projects")} sx={{ pt: "64px" }} />
            <Grid container justifyContent="space-evenly">
                {isLoading ? (
                    <Typography color={theme.palette.primary}>
                        Loading ...
                    </Typography>
                ) : (
                    projects.map((proj, key) => (
                        <Grid key={key} item mt={5}>
                            <Project
                                img={proj.img}
                                title={proj.title}
                                desc={t(proj.desc)}
                                github={proj.github}
                                live={proj.live}
                            />
                        </Grid>
                    ))
                )}
                <Grid
                    item
                    xs={12}
                    pt={1.5}
                    display="flex"
                    justifyContent="center"
                >
                    <Link href="/projects">
                        <Button
                            variant="contained"
                            sx={{ borderRadius: "10px 0 10px 0" }}
                        >
                            {t("see-more")}
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

function projectsPlaceholder(props) {
    return 0;
}
