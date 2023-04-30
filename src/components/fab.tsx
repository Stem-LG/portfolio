import { Box, Fab } from "@mui/material";
import { useContext } from "react";
import DarkModeContext from "../contexts/darkmode";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

export default function FloatingButtons() {
    const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
    const { data: session } = useSession();
    return (
        <Box
            sx={{
                position: "fixed",
                alignItems: "end",
                bottom: 16,
                right: 16,
                gap: 1,
            }}
            display="flex"
            flexDirection={{ xs: "row", md: "column" }}
        >
            <Tilt scale={1.06} tiltMaxAngleX={15} tiltMaxAngleY={15}>
                <Link href="/userinfo">
                    <Fab
                        sx={{
                            display: !session ? "none" : "flex",
                        }}
                    >
                        <Image
                            src={session?.user?.image?.toString() || ""}
                            style={{ borderRadius: "50%" }}
                            alt="user image"
                            fill={true}
                            object-fit="cover"
                        />
                    </Fab>
                </Link>
            </Tilt>
            <Box
                sx={{ gap: 1 }}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                alignItems="center"
            >
                {[
                    {
                        Icon: FaGithub,
                        link: "https://github.com/Stem-LG",
                        newtab: true,
                    },
                    {
                        Icon: FaLinkedin,
                        link: "https://www.linkedin.com/in/louay-ghanney/",
                        newtab: true,
                    },
                    {
                        Icon: MdEmail,
                        link: "mailto:louayghanney71@outlook.com",
                        newtab: false,
                    },
                ].map(({ Icon, link, newtab }, i) => (
                    <Tilt
                        key={i}
                        scale={1.06}
                        tiltMaxAngleX={15}
                        tiltMaxAngleY={15}
                    >
                        <a
                            href={link}
                            target={newtab ? "_blank" : ""}
                            rel="noreferrer"
                        >
                            <Fab color="primary" size="small">
                                <Icon size={20} />
                            </Fab>
                        </a>
                    </Tilt>
                ))}
                <Tilt scale={1.06} tiltMaxAngleX={15} tiltMaxAngleY={15}>
                    <Fab
                        color="primary"
                        size="large"
                        onClick={() => setDarkMode(!isDarkMode)}
                    >
                        {isDarkMode ? (
                            <FaMoon size={25} />
                        ) : (
                            <FaSun size={25} />
                        )}
                    </Fab>
                </Tilt>
            </Box>
        </Box>
    );
}
