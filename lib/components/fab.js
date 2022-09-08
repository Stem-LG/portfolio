import { Box, Fab, Grid } from "@mui/material";
import { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DarkModeContext from "../contexts/darkmode";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default () => {
    const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
    return (
        <Box
            sx={{ position: "fixed", bottom: 16, right: 16, gap: 1 }}
            display="flex"
            flexDirection="row"
            alignItems="center"
        >
            <a href="https://github.com/Stem-LG" target="_blank">
                <Fab color="primary" size="small">
                    <FaGithub size={20} />
                </Fab>
            </a>
            <a
                href="https://www.linkedin.com/in/louay-ghanney/"
                target="_blank"
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
};
