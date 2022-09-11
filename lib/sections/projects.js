import {
    Typography,
    Box,
    useTheme,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid,
} from "@mui/material";
import Link from "next/link";
import darkmode from "../contexts/darkmode";
import Image from "next/image";
import SectionDivider from "../components/divider";

export default function Projects() {
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
            live: "http://www.stemtech.tk/",
        },
    ];
    const theme = useTheme();
    return (
        <Box
            minHeight="calc(100vh - 64px)"
            id="projects"
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

function Project(props) {
    return (
        <Card
            sx={{
                maxWidth: 300,
                height: 450,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={props.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        {props.desc}
                    </Typography>
                </CardContent>
            </Box>
            <CardActions >
                <a target="_blank" rel="noreferrer" href={props.github}>
                    <Button size="small">Github</Button>
                </a>
                <a target="_blank" rel="noreferrer" href={props.live}>
                    <Button size="small">Try Live!</Button>
                </a>
            </CardActions>
        </Card>
    );
}
