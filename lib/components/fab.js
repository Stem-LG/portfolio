import { Box, Fab} from "@mui/material";
import { useContext } from "react";
import DarkModeContext from "../contexts/darkmode";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function MyFab() {
    const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
    return (
        <Box
            sx={{ position: "fixed", bottom: 16, right: 16, gap: 1 }}
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="center"
        >
            <a
                href="https://github.com/Stem-LG"
                rel="noreferrer"
                target="_blank"
            >
                <Fab color="primary" size="small">
                    <FaGithub size={20} />
                </Fab>
            </a>
            <a
                href="https://www.linkedin.com/in/louay-ghanney/"
                target="_blank"
                rel="noreferrer"
            >
                <Fab color="primary" size="small">
                    <FaLinkedin size={20} />
                </Fab>
            </a>
            <a href="mailto:louayghanney71@outlook.com">
                <Fab color="primary" size="small">
                    <MdEmail size={20} />
                </Fab>
            </a>
            <Fab
                color="primary"
                size="large"
                onClick={() => setDarkMode(!isDarkMode)}
            >
                {isDarkMode ? <FaMoon size={25} /> : <FaSun size={25} />}
            </Fab>
        </Box>
    );
}
