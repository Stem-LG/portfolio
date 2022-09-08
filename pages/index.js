import { useTheme } from "@mui/material";
import TopAppBar from "../lib/components/appbar";
import DarkModeFab from "../lib/components/fab";
import Home from "../lib/sections/home";
import Projects from "../lib/sections/projects";
import Contact from "../lib/sections/contact";

export default function Index(props) {
    const theme = useTheme();
    return (
        <>
            <TopAppBar />
            <Home />
            <Projects />
            <Contact />
            <DarkModeFab />
        </>
    );
}
