import {
    Box,
    Button,
    Collapse,
    TextField,
    TextFieldProps,
    Typography,
    useTheme,
} from "@mui/material";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { Typewriter } from "react-simple-typewriter";
import { ParticlesBG } from "../components/background";
import { MdArrowBack, MdEmail } from "react-icons/md";
import { contactCollapse, linksCollapse } from "../atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";

export default function Index() {
    const contactOpen = useAtomValue(contactCollapse);
    const linksOpen = useAtomValue(linksCollapse);

    return (
        <Box
            sx={{
                height: "100svh",
                width: "100svw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#ffc500",
                gap: "1rem",
                textAlign: "center",
            }}
        >
            <Collapse in={!contactOpen && !linksOpen} timeout={500}>
                {/* name section */}
                <Greeting />
                {/* nav buttons */}
                <NavButtons />
            </Collapse>
            {/* collapsed contact */}
            <Collapse
                in={contactOpen}
                timeout={500}
                sx={{ width: "100%", maxWidth: "40rem", px: "1rem" }}
            >
                <SectionName>Contact Me</SectionName>
                <Contact />
            </Collapse>
            {/* collapsed links */}
            <Collapse
                in={linksOpen}
                timeout={500}
                sx={{ width: "100%", maxWidth: "40rem", px: "1rem" }}
            >
                <SectionName>My Links</SectionName>
                <Links />
            </Collapse>
            {/* particles bg */}
            <ParticlesBG />
        </Box>
    );
}

function Greeting() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                mb: "1rem",
            }}
        >
            <Typography
                sx={{
                    fontSize: { xs: "1.25rem", md: "2rem" },
                    lineHeight: "1rem",
                    mb: { md: "1rem" },
                }}
            >
                Hello There, My name is
            </Typography>
            <Typography
                sx={{
                    lineHeight: { xs: "3rem", md: "4rem" },
                    mb: { md: "2rem" },
                    fontSize: { xs: "3rem", md: "5rem" },
                }}
            >
                Louay Ghanney
            </Typography>
            {/* typewriter */}
            <Typography sx={{ fontSize: { xs: "1.25rem", md: "2rem" } }}>
                I{"'"}m a
                <Typewriter
                    words={[
                        " FullStack Developer",
                        " ML Enthusiast",
                        " Freelancer",
                        "n IT student @ ISETN",
                    ]}
                    cursorStyle="!"
                    cursor
                    cursorBlinking={true}
                    typeSpeed={50}
                    deleteSpeed={25}
                    delaySpeed={2500}
                    loop
                />
            </Typography>
        </Box>
    );
}

function NavButtons() {
    const setContactOpen = useSetAtom(contactCollapse);
    const setLinksOpen = useSetAtom(linksCollapse);

    const myButtons = [
        { name: "certifications", link: "#" },
        { name: "projects", link: "#" },
        {
            name: "links",
            link: "#",
            btnProps: {
                onClick: () => setLinksOpen(true),
            },
        },
        {
            name: "contact",
            link: "#",
            btnProps: {
                onClick: () => setContactOpen(true),
            },
        },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "1rem",
                px: "1rem",
            }}
        >
            {myButtons.map(({ name, link, btnProps }, i) => (
                <Tilt
                    key={i}
                    scale={1.06}
                    tiltMaxAngleX={15}
                    tiltMaxAngleY={15}
                >
                    <Link href={link}>
                        <Button
                            variant="outlined"
                            sx={{
                                width: {
                                    xs: "calc(50vw - 1.5rem)",
                                    md: "auto",
                                },
                                height: "2rem",
                                fontSize: "1rem",
                            }}
                            {...btnProps}
                        >
                            {name}
                        </Button>
                    </Link>
                </Tilt>
            ))}
        </Box>
    );
}

function SectionName({ children }) {
    return <Typography sx={{ fontSize: "2rem" }}>{children}</Typography>;
}

function Links() {
    const setLinksOpen = useSetAtom(linksCollapse);

    const myLinks = [
        { name: "E-Mail", icon: <MdEmail />, link: "#" },
        { name: "Github", icon: <FaGithub />, link: "#" },
        { name: "LinkedIn", icon: <FaLinkedin />, link: "#" },
        { name: "Phone", icon: <FaPhoneAlt />, link: "#" },
        { name: "Coursera", icon: <SiCoursera />, link: "#" }
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Button
                startIcon={<MdArrowBack />}
                endIcon={<Box sx={{ width: "20px" }} />}
                onClick={() => setLinksOpen(false)}
                sx={{ maxWidth: "12rem", mx: "auto" }}
                fullWidth
            >
                Back
            </Button>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "1rem",
                }}
            >
                {myLinks.map(({ name, icon, link }, i) => (
                    <Link key={i} href={link}>
                        <Button variant="contained" startIcon={icon}>
                            {name}
                        </Button>
                    </Link>
                ))}
            </Box>
        </Box>
    );
}

function Contact() {
    const setContactOpen = useSetAtom(contactCollapse);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}
        >
            <Button
                startIcon={<MdArrowBack />}
                endIcon={<Box sx={{ width: "20px" }} />}
                onClick={() => setContactOpen(false)}
                sx={{ maxWidth: "12rem", mx: "auto" }}
                fullWidth
            >
                Back
            </Button>
            <CustomTextField fullWidth label="Name" size="small" />
            <CustomTextField fullWidth label="Email" size="small" />
            <CustomTextField fullWidth label="Subject" size="small" />
            <CustomTextField
                fullWidth
                multiline
                rows={3}
                label="Message"
                size="small"
            />
            <Button size="small" variant="contained">
                Send
            </Button>
        </Box>
    );
}

function CustomTextField(props: TextFieldProps) {
    const theme = useTheme();
    const { sx, ...otherProps } = props;
    return (
        <TextField
            {...otherProps}
            sx={{
                // "& .MuiOutlinedInput-notchedOutline": {
                //     borderColor: `${theme.palette.primary.main}88`,
                // },
                ...sx,
            }}
        />
    );
}
