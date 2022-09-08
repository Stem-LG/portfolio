import {
    Typography,
    Box,
    useTheme,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Grid
} from "@mui/material";
import Link from "next/link"
import darkmode from "../contexts/darkmode";
import Image from "next/image";
import SectionDivider from "../components/divider";

export default () => {
    const projects = [
        {
            img: "/assets/images/web_desn_img.png",
            title: "Lizard",
            desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            github: "https://www.github.com/stem-lg",
            live: "http://www.stemtech.tk/",
        },
        {
            img: "/assets/images/web_desn_img.png",
            title: "Lizard",
            desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            github: "https://www.github.com/stem-lg",
            live: "http://www.stemtech.tk/",
        },
        {
            img: "/assets/images/web_desn_img.png",
            title: "Lizard",
            desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            github: "https://www.github.com/stem-lg",
            live: "http://www.stemtech.tk/",
        },
        {
            img: "/assets/images/web_desn_img.png",
            title: "Lizard",
            desc: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
            github: "https://www.github.com/stem-lg",
            live: "http://www.stemtech.tk/",
        },
    ];
    const theme = useTheme();
    return (
        <Box
            minHeight="calc(100vh - 64px)"
            sx={{ bgcolor: theme.palette.background.default }}
        >
            <SectionDivider title="Projects" />
            <Grid container justifyContent="space-evenly">
                {projects.map((proj) => (
                    <Grid item mt={5}>
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
};

function Project(props) {
    return (
        <Card sx={{ maxWidth: 300 }}>
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
            <CardActions>
                <a target="_blank" href={props.github}>
                    <Button size="small">Github</Button>
                </a>
                <a target="_blank" href={props.live}>
                    <Button size="small">Try Live!</Button>
                </a>
            </CardActions>
        </Card>
    );
}
