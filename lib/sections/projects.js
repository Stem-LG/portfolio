import {
    Box,
    useTheme,
    Button,
    Grid,
} from "@mui/material";
import SectionDivider from "../components/divider";
import Project from "../components/project"

export default function Projects(props) {
    // will add technologies used in bubbles aligned in bottom of every project card image
    const projects = [
        {
            img: "/assets/images/topservices.png",
            title: "Top Services",
            desc: "Website for a Landscaping and Gardening Company",
            github: "https://github.com/Stem-LG/Top-Services",
            live: "https://www.topservices.cf/",
        },
        {
            img: "/assets/images/uniscore.png",
            title: "UniScore",
            desc: "A flutter app that calculates tunisian university orientation score",
            github: "https://github.com/Stem-LG/uniscore",
            live: "https://www.uniscore.cf/",
        },
        {
            img: "/assets/images/bases.png",
            title: "Bases",
            desc: "flutter app that converts between binary, decimal, octal, hexadecimal and roman numbers",
            github: "https://github.com/Stem-LG/Bases_Flutter",
            live: "https://stem-lg.github.io",
        },
        {
            img: "/assets/images/limitbat.png",
            title: "LimitBat",
            desc: "Battery management GUI utility for supported Asus laptops running a linux OS. Made with flutter",
            github: "https://www.github.com/stem-lg",
        },
    ];
    const theme = useTheme();
    return (
        <Box
            minHeight={{ xs: "calc(100vh)", md: "calc(100vh - 64px)" }}
            id={props.id}
            sx={{ bgcolor: theme.palette.background.default }}
        >
            <SectionDivider title="Projects" sx={{ pt: "64px" }} />
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
                    <Button variant="contained">see more</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

