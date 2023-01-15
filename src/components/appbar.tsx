import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    useTheme,
    Grid,
} from "@mui/material";
import { MdHome, MdOutlineListAlt, MdMessage } from "react-icons/md";
import MyDrawer from "./drawer";

export default function TopAppBar() {
    const theme = useTheme();

    const sections = [
        { title: "Home", icon: <MdHome />, link: "/#home" },
        { title: "Projects", icon: <MdOutlineListAlt />, link: "/#projects" },
        { title: "Contact", icon: <MdMessage />, link: "/#contact" },
    ];

    return (
        <>
            <AppBar position="fixed">
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        bgcolor: theme.palette.background.default,
                        boxShadow: "3px white",
                    }}
                >
                    <MyDrawer sections={sections} />

                    <Typography
                        variant="h6"
                        sx={{
                            border: 0.8,
                            p: 0.5,
                            borderRadius: "10px 0 10px 0",
                        }}
                        fontWeight="light"
                        color="primary"
                    >
                        Louay Ghanney
                    </Typography>
                    <Box width={32}/>
                    <MdTrailing sections={sections} />
                </Toolbar>
            </AppBar>
            <Box height={{ xs: "48px", sm: "64px" }} />
        </>
    );
}

function MdTrailing(props) {
    return (
        <Grid
            container
            direction="row"
            width="auto"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
        >
            {props.sections.map((section, key) => {
                return (
                    <Grid item key={key}>
                        <a href={section.link}>
                            <Button
                                variant="contained"
                                color="primary"
                                key={key}
                                sx={{ borderRadius: "10px 0 10px 0" }}
                            >
                                {section.title}
                            </Button>
                        </a>
                    </Grid>
                );
            })}
        </Grid>
    );
}
