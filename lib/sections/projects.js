import { Box, useTheme, Button, Grid } from "@mui/material";
import { useTranslation } from "next-i18next";
import SectionDivider from "../components/divider";
import Project from "../components/project";

export default function Projects(props) {
    const { t } = useTranslation("projects");

    // will add technologies used in bubbles aligned in bottom of every project card image
    const projects = [
        {
            img: "/assets/images/topservices.png",
            title: "Top Services",
            desc: t("projects-descriptions.0"),
            github: "https://github.com/Stem-LG/Top-Services",
            live: "https://www.topservices.cf/",
        },
        {
            img: "/assets/images/uniscore.png",
            title: "UniScore",
            desc: t("projects-descriptions.1"),
            github: "https://github.com/Stem-LG/uniscore",
            live: "https://www.uniscore.cf/",
        },
        {
            img: "/assets/images/bases.png",
            title: "Bases",
            desc: t("projects-descriptions.2"),
            github: "https://github.com/Stem-LG/Bases_Flutter",
            live: "https://stem-lg.github.io",
        },
        {
            img: "/assets/images/limitbat.png",
            title: "LimitBat",
            desc: t("projects-descriptions.3"),
            github: "https://www.github.com/stem-lg/limitbat",
        },
    ];
    const theme = useTheme();
    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "100vh" }}
            id={props.id}
            sx={{ bgcolor: theme.palette.background.default }}
        >
            <SectionDivider title={t("projects")} sx={{ pt: "64px" }} />
            <Grid container justifyContent="space-evenly">
                {projects.map((proj, key) => (
                    <Grid key={key} item mt={5}>
                        <Project
                            img={proj.img}
                            title={proj.title}
                            desc={proj.desc}
                            github={proj.github}
                            live={proj.live}
                        />
                    </Grid>
                ))}
                <Grid
                    item
                    xs={12}
                    pt={1.5}
                    display="flex"
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        sx={{ borderRadius: "10px 0 10px 0" }}
                    >
                        {t("see-more")}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
