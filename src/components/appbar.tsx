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
import Tilt from "react-parallax-tilt";
import Link from "next/link";

interface section {
    title: string;
    icon: JSX.Element;
    link: string;
}

export default function TopAppBar() {
    const theme = useTheme();

    const sections: section[] = [
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
                    }}
                >
                    <MyDrawer sections={sections} />
                    <Tilt
                        // scale={1.06}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                    >
                        <Typography
                            sx={{
                                border: "2px solid",
                                p: "5px",
                                borderRadius: "1rem 0 1rem 0",
                            }}
                        >
                            Louay Ghanney
                        </Typography>
                    </Tilt>
                    <Box width={32} />
                    <MdTrailing sections={sections} />
                </Toolbar>
            </AppBar>
            <Box id="home" height={{ xs: "48px", sm: "64px" }} />
        </>
    );
}

function MdTrailing({ sections }: { sections: section[] }) {
    return (
        <>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
                {sections.map(({ link, title }, key) => (
                    <Tilt
                        key={key}
                        scale={1.06}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                    >
                        <Link href={link}>
                            <Button
                                variant="contained"
                                key={key}
                                sx={{
                                    borderRadius: "1rem 0 1rem 0",
                                }}
                            >
                                {title}
                            </Button>
                        </Link>
                    </Tilt>
                ))}
            </Box>
        </>
    );
}
