import TopAppBar from "../components/appbar";
import DarkModeFab from "../components/fab";
import Home from "../sections/home";
import Projects from "../sections/projects";
import Contact from "../sections/contact";
import Footer from "../components/footer";
import Certifications from "../sections/certifications";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Index(props) {

    const theme = useTheme()

    const sm = useMediaQuery(theme.breakpoints.up("sm"))

    return (
        <>
            <TopAppBar />
            <Scrollbars
                renderThumbVertical={() => (
                    <div style={{ width: "0.5rem", backgroundColor: theme.palette.primary.main, borderRadius:"0.5rem" }} />
                )}
                universal
                style={{ width: "100%", height: `calc(100vh - ${sm?"64":"48"}px)` }}
            >
                <Home id="home" />
                <Certifications id="certifications" />
                <Projects id="projects" />
                <Contact id="contact" />
                <Footer />
                <DarkModeFab />
            </Scrollbars>
        </>
    );
}
