import { Grid, useTheme, Typography } from "@mui/material";
import TopAppBar from "../../lib/components/appbar";
import DarkModeFab from "../../lib/components/fab";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import Project from "../../lib/components/project";

export default function Index(props) {
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <Typography color="primary">
                        Loading ...
                    </Typography>
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
            </Grid>
            <DarkModeFab />
        </>
    );
}
