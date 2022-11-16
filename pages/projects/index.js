import { Grid, useTheme, Typography } from "@mui/material";
import TopAppBar from "../../lib/components/appbar";
import DarkModeFab from "../../lib/components/fab";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import Project from "../../lib/components/project";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "common",
                "appbar",
                "home",
                "projects",
                "contact",
            ])),
        },
    };
}

export default function Index(props) {
    const theme = useTheme();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation("projects");

    useEffect(() => {
        fetch("/api/projects", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ quantity:12 }),
        })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
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
                height="calc(100vh - 64px)"
                sx={{ bgcolor: theme.palette.background.default }}
                width="100%"
                justifyContent="space-evenly"
            >
                {loading ? (
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
            </Grid>
            <DarkModeFab />
        </>
    );
}
