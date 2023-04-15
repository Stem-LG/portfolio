import {
    Typography,
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    useTheme,
    Paper,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

export default function Project({ img, title, desc, github, live }) {
    return (
        <Paper
            sx={{
                m: "1rem",
                height: { xs: "12rem", sm: "17rem" },
                width: { xs: "calc(100vw-1rem)", sm: "19.75rem" },
                position: "relative",
                borderRadius: "1rem",
                
            }}
            elevation={7}
        >
            <Image
                src={img}
                width={768}
                height={768}
                style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "8rem",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    borderRadius: "1rem 1rem 0 0",
                }}
                alt="hello"
            ></Image>
            <Typography
                sx={{
                    mt: "0.3rem",
                    px: "1rem",
                    textAlign: "center",
                    display: { xs: "none", sm: "block" },
                }}
            >
                {desc}
            </Typography>
            <Box
                sx={{
                    height: "4rem",
                    width: "100%",
                    px: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                }}
            >
                <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
                {[
                    { title: "Github", link: github },
                    { title: "Visit", link: live },
                ].map(({ title, link }, i) => (
                    <Tilt
                        key={i}
                        scale={1.06}
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                    >
                        <Link href={link ? link : "#projects"} target={link ? "_blank" : ""}>
                            <Button
                                variant="contained"
                                disabled={link ? false : true}
                                sx={{
                                    height: "2.5rem",
                                    width: "5rem",
                                    ml: i == 0 ? "" : "0.5rem",
                                    borderRadius: "1rem 0",
                                }}
                            >
                                {title}
                            </Button>
                        </Link>
                    </Tilt>
                ))}
            </Box>
        </Paper>
    );
}
