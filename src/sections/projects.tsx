import { Box, useTheme, Button, Grid, Typography } from "@mui/material";
import SectionDivider from "../components/divider";
import Project from "../components/project";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function Projects(props) {
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch("api/getprojects", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ quantity: 4 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects);
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
            <SectionDivider title={"projects"} sx={{ pt: "64px" }} />
            <Grid container justifyContent="space-evenly">
                {isLoading ? (
                    <Typography color="primary">Loading ...</Typography>
                ) : (
                    projects.map((proj, key) => (
                        <Grid key={key} item mt={5}>
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
                            
                            size="large"
                            sx={{ borderRadius: "10px 0 10px 0", mt:{lg:10} }}
                        >
                            {"See More"}
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}
