import {
    Typography,
    Box,
    Button,
    Paper,
    useMediaQuery,
    Divider,
    Collapse,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { ProjectType } from "../types/types";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

//projectprops interface extends projecttype

interface ProjectProps extends ProjectType {
    full?: boolean;
    tech: { id: 0; name: ""; link: "" }[];
}

export default function Project({
    image,
    title,
    description,
    repository,
    link,
    tech,
    full,
}: ProjectProps) {
    const [infoOpen, setInfoOpen] = useState(false);

    const newSm = useMediaQuery("@media (min-width:770px)");

    return (
        <Paper
            sx={{
                m: "1rem",
                width: {
                    xs: !newSm ? "calc(100% - 2rem)" : "22rem",
                    md: "25rem",
                },
                position: "relative",
                borderRadius: "1rem",
                height: "",
            }}
        >
            <Image
                src={image}
                width={768}
                height={768}
                style={{
                    objectFit: "cover",
                    objectPosition: "top",
                    height: "10rem",
                    width: "100%",
                    margin: 0,
                    marginBottom: "-0.4rem",
                    padding: 0,
                    borderRadius: "1rem 1rem 0 0",
                }}
                alt="hello"
            />
            <Box
                sx={{
                    height: "3.5rem",
                    px: "1rem",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Typography>{description}</Typography>
            </Box>
            <Divider />
            <Box
                sx={{
                    height: "3rem",
                    display: "flex",
                    alignItems: "center",
                    pl: "1rem",
                    pr: "0.5rem",
                    gap: "1rem",
                }}
            >
                <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
                <Button
                    endIcon={
                        <MdKeyboardArrowDown
                            style={{
                                transform: infoOpen ? "rotate(180deg)" : "",
                                transition: "all 0.2s linear",
                            }}
                        />
                    }
                    variant="outlined"
                    sx={{
                        borderRadius: "1rem 0",
                        display:
                            !repository && tech.length == 0 && full
                                ? "none"
                                : "flex",
                    }}
                    onClick={() => setInfoOpen(!infoOpen)}
                >
                    info
                </Button>
                <Link href={link || ""} style={{ display: link ? "" : "none" }}>
                    <Button variant="contained" sx={{ borderRadius: "1rem 0" }}>
                        Visit
                    </Button>
                </Link>
            </Box>
            <Divider sx={{ display: infoOpen ? "block" : "none" }} />

            <Collapse in={infoOpen}>
                <Box
                    sx={{
                        display: tech.length > 0 ? "flex" : "none",
                        justifyContent: "center",
                        height: "2rem",
                        alignItems: "center",
                    }}
                >
                    <Typography>Technologies Used</Typography>
                </Box>
                <Box
                    sx={{
                        display: tech.length > 0 ? "flex" : "none",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: "0.4rem",
                        px: "1rem",
                        mb: "0.5rem",
                    }}
                >
                    {tech.map(({ name, link }, i) => (
                        <Link href={link} key={i}>
                            <Button
                                size="small"
                                sx={{
                                    height: "1.7rem",
                                    px: "0.3rem",
                                    minWidth: "",
                                }}
                                variant="contained"
                                color="secondary"
                            >
                                {name}
                            </Button>
                        </Link>
                    ))}
                </Box>
                <Divider
                    sx={{
                        display:
                            tech.length == 0 || !repository ? "none" : "block",
                    }}
                />

                <Box
                    sx={{
                        display: repository ? "flex" : "none",
                        justifyContent: "center",
                        height: "3rem",
                        alignItems: "center",
                    }}
                >
                    <Link href={repository || ""}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "1rem 0",
                                height: "2rem",
                            }}
                        >
                            Source Code
                        </Button>
                    </Link>
                </Box>
            </Collapse>
        </Paper>
    );
}
